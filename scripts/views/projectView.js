(function(module) {
  var projectView = {};

  projectView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('.read-more').show();
    $('.article-body').on('click', 'a', function(e){
      e.preventDefault();
      $($(this).parent().children()).show();
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
