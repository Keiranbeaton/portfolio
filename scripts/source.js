var projects = [];

function Project (opts) {
  for(var prop in opts) {this[prop]= opts[prop];}
}

Project.prototype.toHtml = function() {
  var $source = $('#template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

Project.prototype.populateFilters = function(){
  var $filterSource = $('#filter-template').html();
  var authorTemplate = Handlebars.compile($authorSource);
  return authorTemplate(this);
};

projectsArray.sort(function(a,b) {
  return (new Date(b.createdOn)) - (new Date(a.createdOn));
});

projectsArray.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(obj){
  $('#projects-section').append(obj.toHtml());
  $('#category-filter').append(obj.populateFilters());
  $('select option').each(function() {
    $(this).siblings('[value="' +this.value + '"]').remove();
  });
});
