const express          = require('express');
const myRouter         = express.Router();
const User             = require("../models/user");
const bcrypt           = require("bcrypt");
const bcryptSalt       = 10;
const passport         = require("passport");
const ensureLogin      = require("connect-ensure-login");
const uploadCloud      = require('../config/cloudinary.js');
const Message          = require('../models/message');

myRouter.get('/:id/edit',(req, res, next) => {
  let userId = req.params.id;
  User.findById(userId)
  .then((user) => {
    res.render("Users/profile-edit", {user})
  })
  .catch((error) => {
    console.log(error)
  })
});

myRouter.post('/:id/edit', uploadCloud.single('photo'), (req, res, next) => {
  const userId = req.params.id;
  console.log(userId)
  const { password, specialty, about } = req.body;
  console.log(about)
  //console.log(req.body)
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  console.log(req.file)
  User.update({_id: userId}, { $set: { password: hashPass, specialty, imgName, imgPath, about }},{new: true})
  .then((user) => {
    res.redirect('/board')
  })
  .catch((error) => {
    console.log(error)
  })
});

myRouter.get('/createXp', checkRoles('User'), (req, res,next) => {
  const theUser = req.user
  User.findById(theUser._id)
  .then(user => {
    res.render('Users/createXp', {theUser})
  })
  .catch(err => {
    next();
  })
});

myRouter.post('/createXp', uploadCloud.single('photo'), (req, res,next) => {
  //get the users after getting the getUser _id
  const {title, link, description} = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  //console.log(`username: ${username} subject: ${subject} Content: ${childMsgContent} OGUser: ${req.user.username}`)
  
  if (title === "" || description === "") {
    res.render("Users/createXp", { message: "Missing Field(s)!" });
    return;
  }

  User.findById(req.user._id)
  .then(user => {
    if (!user) {
      res.render("Users/createXp", { message: "The username doesn't exists!" });
      return;
    }
    
    //console.log(`the user = ${user}`)
    const xp = {
      title,
      imgName,
      imgPath,
      links: [link],
      description
    };

    user.experiences.push(xp)
  //console.log(`childMsg = ${childMsg} and newMsg = ${newMsg} and userId = ${req.user._id}`)

    user.save(err => {
      if (err) {
        res.render("User/createXp", { message: "Something went wrong" });
      } else {
        res.redirect("/board");
      }
    })
        //res.redirect("/messenger");
  })
  .catch(error => {
    next(error)
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

module.exports = myRouter;