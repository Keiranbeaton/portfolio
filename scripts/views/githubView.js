(function(module) {
  var githubView = {};

  var ui = function() {
    var $about = $('#about');
    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render = Handlebars.compile($('#template').text());

  githubView.index = function() {
    ui();
    $('#about ul').append(
      githubProject.with('name').map(render)
    );
  };

  module.githubView = githubView;
})(window);
