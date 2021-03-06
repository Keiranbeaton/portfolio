(function(module) {

  function GithubProject (opts) {
    Object.keys(opts).forEach(function(prop, index, keys) {
      this[prop] = opts[prop];
    },this);
  }

  GithubProject.all = [];

  GithubProject.fixDates = function() {
    GithubProject.all = GithubProject.all.map(function(obj) {
      obj.updated_at = obj.updated_at.slice(0, 10);
      obj.created_at = obj.created_at.slice(0, 10);
      return obj;
    });
    console.log(GithubProject.all);
  };

  GithubProject.loadAll = function(rows) {
    GithubProject.all = rows.map(function(ele) {
      return new GithubProject(ele);
    });
  };

  GithubProject.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS githubData (id INTEGER PRIMARY KEY, name VARCHAR, createdOn VARCHAR, updatedOn VARCHAR, projectUrl VARCHAR);'
    );
  };

  GithubProject.getData = function() {
    $.ajax({
      url: 'https://api.github.com/users/Keiranbeaton/repos' + '?per_page=25' + '&sort=updated',
      type: 'GET',
      headers: {'Authorization':'token ' + githubToken},
      success: function(data, message, xhr) {
        GithubProject.loadAll(data);
        GithubProject.fixDates();
        GithubProject.all.forEach(function(a){
          a.insertRecord();
        });
      }
    });
  };

  GithubProject.truncateTable = function() {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM githubData'
        }
      ]
    );
  };

  GithubProject.populateDatabase = function() {
    webDB.execute('SELECT * FROM githubData', function(rows) {
      if (rows.length === 0) {
        GithubProject.getData();
      } else {
        GithubProject.truncateTable();
        GithubProject.getData();
      };
    });
  };

  GithubProject.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO githubData (name, createdOn, updatedOn, projectUrl) VALUES (?, ?, ?, ?);',
          'data': [this.name, this.created_at, this.updated_at, this.html_url]
        }
      ],
      function result() {
      }
    );
  };

  GithubProject.with = function(attr) {
    return GithubProject.all.filter(function(GithubProject) {
      return GithubProject[attr];
    });
  };

  module.GithubProject = GithubProject;
})(window);
