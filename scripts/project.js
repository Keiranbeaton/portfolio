(function (module) {

  function Project (opts) {
    for(var prop in opts) {this[prop] = opts[prop];}
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

  Project.fetchAll = function() {
    if (localStorage.projectsData) {
      Project.loadAll(JSON.parse(localStorage.projectsData));
      projectView.initIndexPage();
    } else {
      $.getJSON('data/projectsData.json',function(data){
        Project.loadAll(data);
        localStorage.projectsData = JSON.stringify(data);
        projectView.initIndexPage();
      });
    }
  };

  module.Project = Project;
})(window);
