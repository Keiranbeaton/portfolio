(function(module) {
  var projectController = {};

  projectController.index = function() {
    if(Project.all.length === 0) {
      Project.callTables();
    }
    projectView.setTeasers();
    $('#projects-section').fadeIn().siblings().hide();
  };

  module.projectController = projectController;
})(window);
