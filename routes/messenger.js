const express            = require("express");
const msgRouter          = express.Router();
const User               = require("../models/user");
const Message            = require('../models/message');
const bcrypt             = require("bcrypt");
const bcryptSalt         = 10;
const ensureLogin        = require("connect-ensure-login");
const passport           = require("passport");

msgRouter.get('/', checkRoles('User'),(req, res, next) => {
  User.findById(req.user._id).populate('inbox')
  .then(user=> {
    let msgs = user.inbox 
    console.log(msgs[0].subject);
    res.render('MsgBoard/index', {msgs});
  });  
});

msgRouter.get('/:msgid', checkRoles('User'), (req, res, next) => {

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
      res.render("MsgBoard/rendering", {theMsg})
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