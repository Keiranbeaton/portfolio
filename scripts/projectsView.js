var projectView = {};

projectView.handleNavBar = function() {
  $('.nav-bar').on('click', '.nav-tab', function(){
    $('.content-section').hide();
    var chosenTab = $(this).attr('data-content');
    $('section[id = "' + chosenTab + '"]').fadeIn();
  });
  $('.nav-bar .nav-tab:first').click();
};

// projectView.populateFilter = function() {
//   $('.project').each(function() {
//     if (!$(this).hasClass('template')) {
//       var val = $(this).attr('data-category');
//       var optionTag = '<option value="' + val + '">' + val + '</option>';
//       if ($('#category-filter option[value="' + val + '"]').length === 0) {
//         $('#category-filter').append(optionTag);
//       }
//     }
//   });
// };

projectView.handleFilter = function() {
  $('#category-filter').on('change', function() {
    if($(this).val()) {
      $('.project').hide();
      var categoryName = $(this).val();
      $('.project[data-category="' + categoryName + '"]').fadeIn();
    } else {
      $('article').show();
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

$(document).ready(
  projectView.handleNavBar(),
  projectView.handleFilter(),
  projectView.setTeasers()
);
