"use strict";
const Solicitude = require("../model/solicitude");

//Register a solicitude
exports.postAddSolicitude = async (req, res) => {
  const userid = req.body.userid;
  const userName = req.body.userName;
  const date = req.body.date;
  const description = req.body.description;
  const title= req.body.title;
  const solved = req.body.solved;
  const image = req.body.image;
  const selected = req.body.selected;
  const offers = req.body.offers;
  const solicitude = new Solicitude(userid, userName, date, description, title, solved, image, selected, offers);
  solicitude.save()
    .then(() => {
      res.status(200).json({ message: "Added" });
    })
    .catch(err => {
      console.log(err);
    });
};

//Obtener todas las solicitudes
exports.getAllSolicitudes = (req, res) => {
  const solicitudeO = new Solicitude();
  solicitudeO.fetchAll()
    .then(solicitudes => {
      res.status(200).json(solicitudes);
    })
    .catch(err => {
      console.log(err);
    });
};

//Obtener todas las solicitudes con un usuario y/o fecha dados
exports.getSolicitudesByFilter = (req, res) => {
  const solicitudeO = new Solicitude();
  const user = req.body.user;
  const date = req.body.date;
  solicitudeO.fetchFilter(user, date)
    .then(solicitudes => {
      res.status(200).json(solicitudes);
    })
    .catch(err => {
      console.log(err);
    });
};

