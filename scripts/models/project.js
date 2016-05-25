(function (module) {

  function Project (opts) {
    Object.keys(opts).forEach(function(prop, index, keys) {
      this[prop] = opts[prop];
    },this);
  }

  Project.all = [];

  Project.prototype.toHtml = function(templateId) {
    var template = Handlebars.compile((templateId).text());
    return template(this);
  };

  // Project.loadAll = function(data) {
  //   data.sort(function(a,b) {
  //     return (new Date(b.createdOn)) - (new Date(a.createdOn));
  //   });
  //   data.forEach(function(ele) {
  //     Project.all.push(new Project(ele));
  //   });
  // };

  // Project.getAll = function(next) {
  //   $.getJSON('data/projectsData.json', function(responseData) {
  //     Project.loadAll(responseData);
  //     localStorage.projectsData = JSON.stringify(responseData);
  //     next();
  //   });
  // };

  // Project.fetchAll = function(next) {
  //   if (localStorage.projectsData) {
  //     $.ajax({
  //       type: 'HEAD',
  //       url: 'data/projectsData.json',
  //       success: function(data, message, xhr) {
  //         var eTag = xhr.getResponseHeader('eTag');
  //         if (!localStorage.eTag || eTag !== localStorage.eTag) {
  //           localStorage.eTag = eTag;
  //           Project.getAll(next);
  //         } else {
  //           Project.loadAll(JSON.parse(localStorage.projectsData));
  //           next();
  //         }
  //       }
  //     });
  //   } else {
  //     Project.getAll(next);
  //   }
  // };

  Project.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS projectData (id INTEGER PRIMARY KEY, title VARCHAR, match VARCHAR REFERENCES githubData(name), category VARCHAR, body VARCHAR);',
      function(result) {
        console.log('Successfully set up the projectData table.', result);
      }
    );
  };

  Project.populateDatabase = function() {
    webDB.execute('SELECT * FROM projectData', function(rows) {
      console.log(rows);
      if (rows.length === 0) {
        $.getJSON('data/projectsData.json', function(data) {
          data.forEach(function(obj) {
            var project = new Project(obj);
            project.insertRecord();
          });
        });
      } else {
        console.log('project.populateDatabase did not do what it was supposed to');
      };
    });
  };

  Project.prototype.insertRecord = function() {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO projectData (title, match, category, body) VALUES (?, ?, ?, ?);',
          'data': [this.title, this.match, this.category, this.body]
        }
      ],
      function result() {
        console.log('inserted Project');
      }
    );
  };

  Project.loadAll = function(rows) {
    Project.all = rows.map(function(ele) {
      return new Project(ele);
    });
  };

  Project.joinTables = function(callback) {
    console.log('join tables started');
    webDB.execute(
      'SELECT projectData.id, title, match, category, body, githubData.createdOn AS createdOn, githubData.updatedOn AS updatedOn, githubData.projectUrl AS projectUrl FROM projectData INNER JOIN githubData ON projectData.match=githubData.name ORDER BY title DESC;',
    function(result) {
      console.log('really hoping the tables joined', result);
      Project.loadAll(result);
      callback();
    });
  };

  Project.callTables = function() {
    Project.createTable();
    githubProject.createTable();
    Project.populateDatabase();
    githubProject.populateDatabase();
    Project.joinTables(projectView.initIndexPage);
  };

  Project.truncateTables = function() {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM projectData'
        },
        {
          'sql': 'DELETE FROM githubData'
        }
      ]
    );
  };

  Project.allCategories = function() {
    return Project.all.map(function(project) {
      return project.category;
    })
    .reduce(function(categories, category) {
      if (categories.indexOf(category) === -1) {
        categories.push(category);
      }
      return categories;
    }, []);
  };

  Project.numberByCategory = function() {
    return Project.allCategories().map(function(category) {
      return {
        category: category,
        totalNumber: Project.all.filter(function(a) {
          return a.category === category;
        }).length
      };
    });
  };

  module.Project = Project;

})(window);
