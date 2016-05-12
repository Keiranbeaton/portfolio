var projects = [];

function Project (opts) {
  for(var prop in opts) {this[prop]= opts[prop];}
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.removeClass('template');
  $newProject.attr('data-category', this.category);
  $newProject.find('h3:first').html(this.title);
  $newProject.find('.article-body').html(this.body);
  $newProject.find('time[pubdate]').attr('datetime', this.createdOn);
  $newProject.find('time[pubdate]').attr('title', this.createdOn);
  $newProject.find('time').html(parseInt((new Date() - new Date(this.createdOn))/60/60/24/1000) + ' days ago');
  $newProject.append('<hr>');
  return $newProject;
};

projectsArray.sort(function(a,b) {
  return (new Date(b.createdOn)) - (new Date(a.createdOn));
});

projectsArray.forEach(function(keiran) {
  projects.push(new Project(keiran));
});

projects.forEach(function(a){
  $('#projects-section').append(a.toHtml());
});
