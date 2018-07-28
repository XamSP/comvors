const express            = require("express");
const msgRouter          = express.Router();
const User               = require("../models/user");
const Message            = require('../models/message');
const bcrypt             = require("bcrypt");
const bcryptSalt         = 10;
const ensureLogin        = require("connect-ensure-login");
const passport           = require("passport");
const uploadCloud = require('../config/cloudinary.js');

msgRouter.get('/', checkRoles('User'),(req, res, next) => {
  const theUser = req.user
  User.findById(req.user._id).populate('inbox')
  .then(user=> {
    const msgs = user.inbox 
    //console.log(msgs[0].subject);
    res.render('MsgBoard/index', {theUser, user, msgs});
  });  
});

msgRouter.get('/create', checkRoles('User'), (req, res,next) => {
  const theUser = req.user
  User.findById(req.user._id).populate('friends')
  .then(user => {
    res.render('MsgBoard/startmsg', {theUser, user})
  })
  .catch(err => {
    next();
  })
});

msgRouter.post('/create', checkRoles('User'), (req, res,next) => {
  const username = req.body.username;
  const subject = req.body.subject;
  //get the users after getting the getUser _id
  const {childMsgContent} = req.body;
  //console.log(`username: ${username} subject: ${subject} Content: ${childMsgContent} OGUser: ${req.user.username}`)
  
  if (username === "" || subject === "" || childMsgContent === "") {
    res.render("messenger/create", { message: "Missing Field(s)!" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (!user) {
      res.render("messenger/create", { message: "The username doesn't exists!" });
      return;
    }
    
    //console.log(`the user = ${user}`)
    const childMsg = {
      msg: childMsgContent,
      user: req.user._id
    };

    const newMsg = new Message({
      subject,
      users: [user._id, req.user._id],
      texts: [childMsg] 
    });

  //console.log(`childMsg = ${childMsg} and newMsg = ${newMsg} and userId = ${req.user._id}`)

    newMsg.save((err) => {
      if (err) {
        res.render("messenger/create", { message: "Something went wrong" });
      } else {
        user.inbox.push(newMsg._id)
        user.save(err => {
          if (err) {
            res.render("messenger/create", { message: "Something went wrong" });
          } else {
            req.user.inbox.push(newMsg._id)
            req.user.save(err => {
              if (err) {
                res.render("messenger/create", { message: "Something went wrong" });
              } else {
                res.redirect("/messenger");
              }
            })
            //res.redirect("/messenger");
          }
        })
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

msgRouter.get('/:msgid', checkRoles('User'), (req, res, next) => {
  const theUser = req.user
  let msgId = req.params.msgid;
  if (!msgId) { 
    return res.status(404).render('not-found'); 
  }
  Message.findById(msgId).populate('users').populate('texts.user')
    .then(theMsg => {
      if (!theMsg) {
          return res.status(404).render('not-found');
      }
      console.log(theMsg)
      //const user = theMsg.populate('users')
      res.render("MsgBoard/rendering", {theUser,theMsg})
    })
    .catch(next)
  });

msgRouter.post('/:msgid', (req, res, next) => {
  //get the id of parent msg and input child id of msg
  const {childMsgContent} = req.body;
  Message.findById(req.params.msgid).populate('texts')
  .then(sendMsg => {

    const childMsg = {
      msg: childMsgContent,
      user: req.session.passport.user
    };
    // Pushes childMsg(obj) to var parentMsg
    sendMsg.texts.push(childMsg);

    sendMsg.save()
      .then(event => {
        console.log('the save is' + event)
        res.send(event);
      }) 
      .catch(err => {
        console.log('no work saving the childMsg:', err);
        next();
      })
  })
  .catch(err => {
    console.log("Error with axios", err)
    next();
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

module.exports = msgRouter;