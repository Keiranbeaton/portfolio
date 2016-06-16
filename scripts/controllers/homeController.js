(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').fadeIn().siblings().hide();
  };

  module.homeController = homeController;
})(window);
