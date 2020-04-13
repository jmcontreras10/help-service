const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  });

router.get("/logout",
  function (req, res) {
    req.logout();
    res.send(true);
  });
router.get("/user",
  function(req,res){
    res.json(req.user||null);
  });
module.exports = router;
