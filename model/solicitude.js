"use strict";

const mongodb = require('mongodb');
const getDb = require('../util/dbManager').getDb;

class Solicitude {

    constructor(user , date, description, solved, reported, id) {  
        this.user = user;
        this.date = date;
        this.description = description;
        this.solved = solved;
        this.reported = reported;
        this._id = id?new mongodb.ObjectID(id):undefined;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //Update
            dbOp = db.collection('solicitudes')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            //Create
            dbOp = db.collection('solicitudes')
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
            .collection('solicitudes')
            .find()
            .toArray()
            .then(solicitudes => {
                return solicitudes;
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchFilter(user, date) {
        let query = {};
        if (user) {
            query.user = user;
        }
        if (date) {
            query.date = date;
        }
        const db = getDb();
        return db
            .collection('solicitudes')
            .find(query)
            .toArray()
            .then(solicitudes => {
                return solicitudes;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Solicitude;