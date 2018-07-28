const express            = require("express");
const userRouter         = express.Router();
const User               = require("../models/user");
const bcrypt             = require("bcrypt");
const bcryptSalt         = 10;
const ensureLogin        = require("connect-ensure-login");
const passport           = require("passport");
const uploadCloud        = require('../config/cloudinary.js');

userRouter.get('/', (req, res, next) => {
  const user = req.user
  
  res.render('Users/scout', {user});
});

userRouter.get('/user-list', (req, res, next) => {
  const user = req.user
  let userSpecialty = req.query.specialty;
  let msgAll = "All";
  if(userSpecialty){msgAll = userSpecialty}
  console.log(userSpecialty);
  if(!userSpecialty){
    User.find().then(users => {
      res.render('Users/user-list' , {user, users, msgAll} );
      })
      .catch((error) => {
      console.log(error)
      next();
      })
  } else {
  User.find({'specialty': userSpecialty}).then(users => {
  res.render('Users/user-list' , {user, users, msgAll} );
  })
  .catch((error) => {
  console.log(error)
  next();
  })
}
});

userRouter.get('/:id', checkRoles('User'), (req, res, next) => {
  const user = req.user
  let userId = req.params.id;
  if (!userId) { 
    return res.status(404).render('not-found'); 
  }
  
  User.findById(userId)
    .then(theUser => {
      if (!theUser) {
          return res.status(404).render('not-found');
      }
      console.log('here')
      res.render("Users/profile", theUser, {user})
    })
    .catch(next)
});

userRouter.post('/:id', checkRoles('User'), (req, res, next) =>{
  User.findById(req.params.id).populate('friendReq')
  .then(user => {
    user.friendReq.push(req.user._id);

    user.save()
      .then(event => {
        console.log('the save is' + event)
        res.redirect('/friends')
      }) 
      .catch(err => {
        console.log('no work saving the childMsg:', err);
        next();
      })
  })
});

userRouter.get('/user-list/:id', (req, res, next) => {
  const theUser = req.user 
  let userId = req.params.id;
  User.findById(userId)
  .then((user) => {
    res.render("Users/profile", {theUser, user})
  })
  .catch((error) => {
    console.log(error)
  })
});

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/')
    }
  }
}

module.exports = userRouter;