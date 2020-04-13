"use strict";
const getDb = require("../util/dbManager").getDb;

class User {

  constructor(name, phone, gender, address, email, image,password) {  
    this.email= email;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.gender = gender;
    this.image = image;
    this._id = email;
    if(password){
      this.password=password;
    }
  }

  save() {
    const db = getDb();
    let dbOp;
    dbOp = db.collection("users")
      .updateOne({_id:this._id}, { $set: this }, { upsert: true });
    return dbOp
      .then(() => {
        //Nothing to show
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchAll() {
    const db = getDb();
    return db
      .collection("users")
      .find()
      .toArray()
      .then(users => {
        return users;
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchFilter(email,name) {
    let query = {};
    if (name) {
      query.name = name;
    }
    if (email) {
      query.email = email;
    }
    const db = getDb();
    return db
      .collection("users")
      .find(query)
      .toArray()
      .then(users => {
        return users;
      })
      .catch(err => {
        console.log(err);
      });
  }

}




module.exports = User;