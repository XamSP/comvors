const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
}
}

router.get("/login", (req, res, next) => {
  res.render("login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {

  successRedirect: "/board",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
    
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get("/signup", (req, res, next) => {
  res.render('signup');
})

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const specialty = req.body.specialty;
  if (username === "" || password === "") {
    res.render("signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      specialty
    });

    newUser.save((err) => {
      if (err) {
        res.render("signup", { message: "Something went wrong" });
      } else {
        res.redirect("/board");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

router.get('/board', checkRoles('User'), (req, res) => {
  User.find()
  .then(users => {
    
    res.render('board', {user: req.user, users});
  })
  .catch(error => {
    console.log(error)
  })
});

module.exports = router;
