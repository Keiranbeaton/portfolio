(function(module) {
  var projectView = {};

  projectView.handleNavBar = function() {
    $('.nav-bar').on('click', '.nav-tab', function(){
      $('.content-section').hide();
      var chosenTab = $(this).attr('data-content');
      $('section[id = "' + chosenTab + '"]').fadeIn();
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
        $('article.template').hide();
      }
    });
  };

  projectView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a', function(e){
      e.preventDefault();
      var parentArticle = $(this).parent();
      var childSection = parentArticle.children('.article-body');
      $(childSection).children().show();
      $(this).hide();
    });
  };

  projectView.initIndexPage = function() {
    Project.all.forEach(function(a){
      if($('#category-filter option:contains("'+ a.category + '")').length === 0) {
        $('#category-filter').append(a.toHtml($('#filter-template')));
      };
      $('#projects-section').append(a.toHtml($('#template')));
    });
    projectView.handleNavBar();
    projectView.handleFilter();
    projectView.setTeasers();
  };
  module.projectView = projectView;
})(window);
