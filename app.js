require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const bcrypt       = require('bcrypt');
const session      = require('express-session');
const passport     = require("passport");
const LocalStrategy= require("passport-local").Strategy;
const User         = require("./models/user");
const flash        = require("connect-flash");
//const Handlebars = require('handlebars/runtime');
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/comvors', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));
// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use((req, res, next) => {
  // Adds user domain to be accessed from hbs to be used with axios on heroku 
  req.userDomain = process.env.DOMAIN;
  if(req.user){
  User.findById(req.user._id)
    .then(user => {
      req.user = user;
    });
  }
  // Allows request to be accessed from handlebars
  app.locals.req = req;
  // console.log(req.url)
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user); 
  });
});

app.use(flash());
passport.use(new LocalStrategy({
  passReqToCallback: true
  },(req, username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username!!!" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());


// default value for title local
app.locals.title = 'Comvors';

const index = require('./routes/index');
app.use('/', index);

const scout = require('./routes/scout');
app.use('/scout', scout);

const messenger = require('./routes/messenger');
app.use('/messenger', messenger);

const friends = require('./routes/friends');
app.use('/friends', friends);

const myself = require('./routes/myself');
app.use('/myself', myself);

// const admin = require('./routes/admin');
// app.use('/admin', admin);

module.exports = app;
