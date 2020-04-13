var passport = require("passport");
var Strategy = require("passport-local").Strategy;
// var db = require("./db");

const usersMap = new Map();

const user = {
  id: "juan",
  username: "juan",
  password: "juan",
};

usersMap.set(user.username,user);

passport.use(new Strategy(function (username, password, cb) {
  // db.users.findByUsername(username, function (err, user) {
  // 	if (err) { return cb(err); }
  // 	if (!user) { return cb(null, false); }
  // 	if (user.password != password) { return cb(null, false); }
  // 	return cb(null, user);
  // });
  console.log(usersMap.has(username));
  if (usersMap.has(username)) {
    const user = usersMap.get(username);
    console.log(user);
    if (user.password == password) {
      console.log("strategy",user);
      return cb(null, user);
    }
    return cb(null, false);
  }
  return cb(null, false);
})
);

passport.serializeUser(function (user, cb) {
  console.log("serialize");
  cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
  // db.users.findById(id, function (err, user) {
  // 	if (err) { return cb(err); }
  // 	cb(null, user);
  // });

  console.log("deserialize");
  if (usersMap.has(username)) {
    let res = { ...usersMap.get(username)};
    res.password="";
    return cb(null,res);
  }
  return cb(new Error("user not found"));

});

const configurePassport = (app) => {
  console.log("config");
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