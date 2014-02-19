var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project.find({"_id": projectID}, afterQuery);
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var newPost = new models.Project({
    "title": form_data.project_title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image_url
  });
  newPost.save(afterSaving);

  function afterSaving(err) {
    if(err) {console.log(err); res.send();}
    res.redirect('/');
  }

}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemove);

  // query for the specific project and
  // call the following callback

  function afterRemove(err) {
    if(err) console.log(err);
    res.send();
  }
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}
