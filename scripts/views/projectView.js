(function(module) {
  var projectView = {};

  projectView.setTeasers = function() {
    $('.read-more').show();
    $('.article-body *:nth-of-type(n+1)').hide();
    $('.article-body').on('click', 'a', function(e){
      e.preventDefault();
      $($(this).parent().children('.article-body')).children().show();
      $(this).hide();
    });
  };

  projectView.handleFilter = function() {
    $('#category-filter').on('change', function() {
      if($(this).val()) {
        $('.project').hide();
        $('.project[data-category="' + $(this).val() + '"]').show();
      } else {
        $('.project').show();
      }
      projectView.setTeasers();
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

    projectView.handleFilter();
    projectView.setTeasers();
  };

  module.projectView = projectView;

})(window);
