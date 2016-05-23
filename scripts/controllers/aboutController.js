(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#page-description').hide();
    $('#projects-section').hide();
    $('#about-me').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
