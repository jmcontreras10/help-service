"use strict";
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

let _db; 

const url = process.env.MONGO_URL_HELP;

const mongoConnect = (callback) => {
  MongoClient.connect(url,{
    useUnifiedTopology: true })
    .then(client=>{
      console.log("Connected!");
      _db = client.db();
      callback();
    })  
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if(_db){
    return _db;
  }
  throw "Not database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;