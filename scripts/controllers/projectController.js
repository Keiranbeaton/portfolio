(function(module) {
  var projectController = {};

  projectController.index = function() {
    if(Project.all.length === 0) {
      Project.fetchAll(projectView.initIndexPage);
    }
    projectView.setTeasers();
    $('#page-description').hide();
    $('#about-me').hide();
    $('#projects-section').fadeIn();
  };

  module.projectController = projectController;
})(window);
