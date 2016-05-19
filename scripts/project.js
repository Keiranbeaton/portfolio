(function (module) {

  function Project (opts) {
    Object.keys(opts).forEach(function(prop, index, keys) {
      this[prop] = opts[prop];
    },this);
  }

  Project.all = [];

  Project.prototype.toHtml = function(templateId) {
    var template = Handlebars.compile((templateId).html());
    return template(this);
  };

  Project.loadAll = function(data) {
    data.sort(function(a,b) {
      return (new Date(b.createdOn)) - (new Date(a.createdOn));
    });
    data.forEach(function(ele) {
      Project.all.push(new Project(ele));
    });
  };

  Project.getAll = function(next) {
    $.getJSON('data/projectsData.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.projectsData = JSON.stringify(responseData);
      next();
    });
  };

  Project.fetchAll = function(next) {
    if (localStorage.projectsData) {
      $.ajax({
        type: 'HEAD',
        url: 'data/projectsData.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Project.getAll(next);
          } else {
            Project.loadAll(JSON.parse(localStorage.projectsData));
            next();
          }
        }
      });
    } else {
      Project.getAll(next);
    }
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
        })
        .map(function(a) {
          return 1;
        })
        .reduce(function(a, b) {
          return a + b;
        })
      };
    });
  };

  module.Project = Project;

})(window);
