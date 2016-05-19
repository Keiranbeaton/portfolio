(function(module) {
  var projectView = {};

  projectView.handleNavBar = function() {
    $('.nav-bar').on('click', '.nav-tab', function(){
      $('.content-section').hide();
      $('section[id = "' + $(this).attr('data-content') + '"]').fadeIn();
      projectView.setTeasers();
    });
    $('.nav-bar .nav-tab:first').click();
  };

  projectView.handleFilter = function() {
    $('#category-filter').on('change', function() {
      if($(this).val()) {
        $('.project').hide();
        $('.project[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('.project').fadeIn();
      }
      projectView.setTeasers();
    });
  };

  projectView.setTeasers = function() {
    $('.read-more').show();
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a', function(e){
      e.preventDefault();
      $($(this).parent().children('.article-body')).children().show();
      $(this).hide();
    });
  };

  projectView.initIndexPage = function() {
    var template = Handlebars.compile($('#filter-template').text());

    Project.numberByCategory().forEach(function(a) {
      $('#category-filter').append(template(a));
    });

    Project.all.forEach(function(a){
      $('#projects-section').append(a.toHtml($('#template')));
    });

    projectView.handleNavBar();
    projectView.handleFilter();
    projectView.setTeasers();
  };

  module.projectView = projectView;

})(window);
