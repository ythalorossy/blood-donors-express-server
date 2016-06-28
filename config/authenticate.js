var 
  passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../app/models/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());