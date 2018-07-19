const express      = require('express');
const frndRouter   = express.Router();
const User         = require("../models/user");
const Message      = require('../models/message');

frndRouter.get('/', (req, res, next) => {
  User.findById(req.user._id).populate('friends')
  .then(user=> {
    let myFriends = user.friends 
    console.log('ok ' + myFriends[0].username);
    res.render('Friends/list', {myFriends});
  })
  .catch(error => {
    next(error)
  })
  
});

frndRouter.get('/:id', (req, res, next) => {
  User.findById(req.params.id).populate('friends')
  .then(user=> {
    res.render('Friends/profile', {user});
  })
  .catch(error => {
    next(error)
  })
  
});

module.exports = frndRouter;