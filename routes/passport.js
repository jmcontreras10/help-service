const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("login");
    res.redirect("/");
  });

router.get("/logout",
  function (req, res) {
    req.logout();
    res.send(true);
  });
router.get("/user",
  function(req,res){
    console.log(req.user);
    res.json(req.user||null);
  });
module.exports = router;
