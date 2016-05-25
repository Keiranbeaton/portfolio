(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#page-description').fadeIn().siblings().hide();
  };

  module.homeController = homeController;
})(window);
