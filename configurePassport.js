"use strict";
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
const User = require("./model/user");
const us = new User();
passport.use(new Strategy(function (username, password, cb) {
  us.fetchFilter(username).then(users => {
    const user = users.length > 0 ? users[0] : undefined;
    if (user && user.password == password) {
      return cb(null, user);
    }
    return cb(null, false);
  });
})
);

passport.serializeUser(function (user, cb) {
  cb(null, user.email);
});

passport.deserializeUser(function (username, cb) {
  us.fetchFilter(username).then(users => {
    const user = users.length > 0 ? users[0] : undefined;
    if (user) {
      let res = { ...user };
      res.password = undefined;
      return cb(null, res);
    }
    return cb(new Error("user not found"));
  });

});

const configurePassport = (app) => {
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(require("express-session")({
    secret: "Helping others is helping you",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = configurePassport;