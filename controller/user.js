"use strict";
const User = require("../model/user");
//Register
exports.postAddUser = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const address = req.body.address;
  const email = req.body.email;
  const image = req.body.image;
  const password = req.body.password;
  const user = new User(name, phone, gender, address, email, image, password);
  user.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAllUsers = (req, res) => {
  const userO = new User();
  userO.fetchAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getUsersByFilter = (req, res) => {
  const userO = new User();
  const name = req.query.name;
  const email = req.query.email;
  userO.fetchFilter(email, name)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
    });
};
