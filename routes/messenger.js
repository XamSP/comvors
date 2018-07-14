const express            = require("express");
const userRouter         = express.Router();
const User               = require("../models/user");
const bcrypt             = require("bcrypt");
const bcryptSalt         = 10;
const ensureLogin        = require("connect-ensure-login");
const passport           = require("passport");

msgRouter.get('/', (req, res, next) => {
  res.render('MsgBoard/index');
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