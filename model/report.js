"use strict";
const getDb = require("../util/dbManager").getDb;

class Report {

  constructor(user, date, description) {
    this.user = user;
    this.date = date;
    this.description = description;
  }

  save() {
    const db = getDb();
    let dbOp;
    //Create
    dbOp = db.collection("reports")
      .updateOne({}, { $set: this }, { upsert: true });
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
      .collection("reports")
      .find()
      .toArray()
      .then(reports => {
        return reports;
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
      .collection("reports")
      .find(query)
      .toArray()
      .then(reports => {
        return reports;
      })
      .catch(err => {
        console.log(err);
      });
  }

}

module.exports = Report;