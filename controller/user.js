"use strict";
const User = require('../model/user');
//Register
exports.postAddUser = async (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const adress = req.body.adress;
    const user = new User(name, phone, gender, adress);
    user.save()
        .then(() => {
            res.status(200).json({ message: "Added" })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.login = (req, res) => {
    //TODO
}

exports.getAllUsers = (req, res) => {
    const userO = new User();
    userO.fetchAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getUsersByFilter = (req, res) => {
    const userO = new User();
    const name = req.query.name;
    const email = req.query.email;
    userO.fetchFilter(name, email)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.modifyUserById = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const adress = req.body.adress;


    const user = new User(name, phone, gender, adress, id);
    user
        .save()
        .then(() => {
            res.status(200).json({ message: "Updated" });
        })
        .catch(err => {
            console.log(err);
        })
}

