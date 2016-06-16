(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').fadeIn().siblings().hide();
    if(Project.all.length === 0) {
      Project.callTables();
    }
  };

  module.homeController = homeController;
})(window);
