(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#about-me').fadeIn().siblings().hide();
  };

  module.aboutController = aboutController;
})(window);
