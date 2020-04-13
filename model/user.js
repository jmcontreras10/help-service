"use strict";

const mongodb = require('mongodb');
const getDb = require('../util/dbManager').getDb;

class User {

    constructor(name, phone, gender, adress, id) {  
        this.name = name;
        this.phone = phone;
        this.gender = gender;
        this.adress = adress;
        this._id = id?new mongodb.ObjectID(id):undefined;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //Update
            dbOp = db.collection('users')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            //Create
            dbOp = db.collection('users')
                .insertOne(this);
        }
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
            .collection('users')
            .find()
            .toArray()
            .then(users => {
                return users;
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchFilter(name, phone) {
        let query = {};
        if (name) {
            query.name = name;
        }
        if (phone) {
            query.phone = phone;
        }
        const db = getDb();
        return db
            .collection('users')
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