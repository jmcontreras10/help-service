"use strict";
const getDb = require("../util/dbManager").getDb;

class Solicitude {

  constructor(userid, userName, date, description, title, solved, image, selected, offers) {  
    this.userid = userid;
    this.userName= userName;
    this.date = date;
    this.description = description;
    this.title = title;
    this.solved = solved;
    this.image = image;
    this.selected= selected;
    this.offers=offers;
    this._id = `${userid}-${date}`;
  }

  save() {
    const db = getDb();
    let dbOp;
    dbOp = db.collection("solicitudes")
      .updateOne({ }, { $set: this },{upsert:true});
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
      .collection("solicitudes")
      .find()
      .toArray()
      .then(solicitudes => {
        return solicitudes;
      })
      .catch(err => {
        console.log(err);
      });
  }

  delete(id){

    const db = getDb();
    return db.collection("solicitudes").deleteOne({"_id":id})
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
      .collection("solicitudes")
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