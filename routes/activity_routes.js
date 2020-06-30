// routes/activity_routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// TODO: require models activity and user
const Activity = require('../models/activity_model');
const User = require('../models/user_model'); 

// GET /activities
router.get('/activities', (req, res, next) => {
  res.send('I am the activities route')

  // TODO: delete, if activities aren't listed
/*   Activity.find().populate('tasks')
    .then(allTheProjects => {
      res.json(allTheProjects);
    }) */

});


// POST /activities
// POST route => to create a new activity
router.post('/activities', (req, res, next) => {

  Activity.create({
    title: req.body.title,
    tags: req.body.tags,
    description: req.body.description,
    pictureUrl: req.file ? req.file.secure_url : undefined,
    location: req.body.location,
    rating: req.body.rating,
    //createdBy: req.user._id,
    comments: req.body.comments    
  })
    .then(newActivity => {
      res.json(newActivity); // { title: '', description: '', _id: '123' }
    })
});


// GET /activities/19283719273587123jhf
// GET route => to get a specific activity/detailed view
router.get('/activities/:identifier', (req, res, next) => {
res.send(`I am id ${req.params.identifier} of an activity`)

  /* Activity.findById(req.params.identifier)
    .then(response => {
      res.json(response);
    }) */
})

// PUT route => to update a specific project
router.put('/activities/:identifier', (req, res, next) => {

// TODO: updates should only be performed by creator and admins

  Activity.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      tasks: []
    })
    .then(() => {
      res.json({ message: `Activity with ${req.params.id} is updated successfully.` });
    })
})

// DELETE route => to delete a specific activity
router.delete('/activities/:identifier', (req, res, next) => {

  // TODO: deletion should only be performed by creator and admins

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Activity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Activity with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


module.exports = router;