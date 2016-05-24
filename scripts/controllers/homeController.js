(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#about-me').hide();
    $('#projects-section').hide();
    $('#page-description').fadeIn();
  };

  module.homeController = homeController;
})(window);
