const express      = require('express');
const frndRouter   = express.Router();
const User         = require("../models/user");
const Message      = require('../models/message');
const uploadCloud = require('../config/cloudinary.js');

frndRouter.put('/:id/delete', (req, res, next) => {
  const userReqId = req.params.id;
  const userId = req.user._id;
  
  User.findById(userId).populate('friends', '_id username')
  .then(user=> {
   //console.log(Array.isArray(user.friendReq));
    const getMapped = user.friends.map(i => i._id == userReqId)
    const getIndex = getMapped.indexOf(true);
    console.log(`user friends is: ${user.friends}`);
    user.friends.splice(getIndex,1)
    console.log(`getMapped is: ${getMapped} and params: ${userReqId} and index is: ${getIndex}` )
    user.save()
      .then(event => {
        //console.log('the save is' + event)
        User.findById(userReqId).populate('friends')
        .then(user2 => {
          const getMapped2 = user2.friends.map(i => i._id == userId)
          const getIndex2 = getMapped2.indexOf(true);
          user2.friends.splice(getIndex2,1)
          user2.save()
          .then(event => {
            res.send(event);
          })
          .catch(err => {
            next();
          })
        })
        .catch(err => {
          next();
        })
      }) 
      .catch(err => {
        console.log('no work saving the childMsg:', err);
        next();
      })
  })
  .catch(error => {
    console.log(`The UserID is ${req.user.username} and the reqID is ${userReqId}`)
    next(error)
  })
});

frndRouter.post('/:id/accepted', (req, res, next) => {
  const userReqId = req.params.id;
  const userId = req.user._id;
  
  User.findById(userId).populate('friendReq', '_id username')
  .then(user=> {
   //console.log(Array.isArray(user.friendReq));
    const getMapped = user.friendReq.map(i => i._id == userReqId)
    const getIndex = getMapped.indexOf(true);
    console.log(`user friendReq is: ${user.friendReq}`);
    user.friends.push(userReqId);
    user.friendReq.splice(getIndex,1);
    console.log(`getMapped is: ${getMapped} and params: ${userReqId} and index is: ${getIndex}` )
    user.save()
      .then(event => {
        
        User.findById(userReqId).populate('friends')
        .then(user2 => {
          user2.friends.push(userId);
          
          user2.save()
            .then(event => {
              res.send(event);
            })
            .catch(err => {
              next();
            })
        })
        .catch(err => {
          next();
        })
      }) 
      .catch(err => {
        console.log('no work saving the childMsg:', err);
        next();
      })
  })
  .catch(error => {
    console.log(`The UserID is ${req.user.username} and the reqID is ${userReqId}`)
    next(error)
  })
});

frndRouter.put('/:id/rejected', (req, res, next) => {
  const userReqId = req.params.id;
  const userId = req.user._id;
  
  User.findById(userId).populate('friendReq', '_id username')
  .then(user=> {
   //console.log(Array.isArray(user.friendReq));
    const getMapped = user.friendReq.map(i => i._id == userReqId)
    const getIndex = getMapped.indexOf(true);
    console.log(`user friendReq is: ${user.friendReq}`);
    user.friendReq.splice(getIndex,1)
    console.log(`getMapped is: ${getMapped} and params: ${userReqId} and index is: ${getIndex}` )
    user.save()
      .then(event => {
        //console.log('the save is' + event)
        res.send(event);
      }) 
      .catch(err => {
        console.log('no work saving the childMsg:', err);
        next();
      })
  })
  .catch(error => {
    console.log(`The UserID is ${req.user.username} and the reqID is ${userReqId}`)
    next(error)
  })
});

frndRouter.get('/', (req, res, next) => {
  User.findById(req.user._id).populate('friends friendReq')
  .then(user=> {
    let myFriends = user.friends;
    let pendingReq = user.friendReq; 
    //console.log(`the pending reqs: ${user}`);
    res.render('Friends/list', {user, myFriends, pendingReq});
  })
  .catch(error => {
    next(error)
  })
  
});

frndRouter.get('/:id', (req, res, next) => {
  const theUser = req.user
  User.findById(req.params.id).populate('friends friendReq')
  .then(user=> {
    res.render('Friends/profile', {theUser, user});
  })
  .catch(error => {
    next(error)
  })
  
});


module.exports = frndRouter;