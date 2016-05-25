(function(module) {
  function githubProject (opts) {
    Object.keys(opts).forEach(function(prop, index, keys) {
      this[prop] = opts[prop];
    },this);
  }

  githubProject.all = [];

  githubProject.requestProjects = function(callback) {
    $.get('/github/users/Keiranbeaton/repos' + '?per_page=15' + '&sort=updated')
    .done(function(data) {
      repos.all = data;
    }).done(callback);
  };

  githubProject.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS githubData (id INTEGER PRIMARY KEY, name VARCHAR, createdOn VARCHAR, updatedOn VARCHAR, projectUrl VARCHAR);',
      function(result) {
        console.log('Successfully set up the githubData table.', result);
      }
    );
  };

  githubProject.populateDatabase = function() {
    webDB.execute('SELECT * FROM githubData', function(rows) {
      console.log(rows);
      if (rows.length === 0) {
        $.ajax({
          url: 'https://api.github.com/users/Keiranbeaton/repos' + '?per_page=25' + '&sort=updated',
          type: 'GET',
          headers: {'Authorization':'token ' + GITHUB_TOKEN},
          success: function(data, message, xhr) {
            data.forEach(function(obj) {
              var project = new githubProject(obj);
              project.insertRecord();
            });
          }
        });
      } else {
        console.log('githubProject.populateDatabase did not do what it was supposed to');
      };
    });
  };

  githubProject.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO githubData (name, createdOn, updatedOn, projectUrl) VALUES (?, ?, ?, ?);',
          'data': [this.name, this.created_at, this.updated_at, this.url]
        }
      ],
      function result() {
        console.log('inserted github data');
      }
    );
  };

  githubProject.with = function(attr) {
    return githubProject.all.filter(function(githubProject) {
      return githubProject[attr];
    });
  };

  module.githubProject = githubProject;
})(window);
