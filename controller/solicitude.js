"use strict";
const Solicitude = require('../model/solicitude');

//Register a solicitude
exports.postAddSolicitude = async (req, res) => {
    const user = req.body.user;
    const date = req.body.date;
    const description = req.body.description;
    const solved = req.body.solved;
    const reported = req.body.reported;

    const solicitude = new Solicitude(user, date, description, solved, reported);
    solicitude.save()
        .then(() => {
            res.status(200).json({ message: "Added" })
        })
        .catch(err => {
            console.log(err);
        });
}

//Obtener todas las solicitudes
exports.getAllSolicitudes = (req, res) => {
    const solicitudeO = new Solicitude();
    solicitudeO.fetchAll()
        .then(solicitudes => {
            res.status(200).json(solicitudes);
        })
        .catch(err => {
            console.log(err);
        })
}

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
        })
}


//Modificar todas las solicitudes con un usuario y/o fecha dados
exports.modifySolicitudeById = (req, res) => {
    const id = req.body.id;
    const user = req.body.user;
    const date = req.body.date;
    const description = description;
    const solved = req.body.solved;
    const reported = req.body.reported;

    const solicitude = new Solicitude(user, date, description, solved, reported, id);
    solicitude
        .save()
        .then(() => {
            res.status(200).json({ message: "Updated" });
        })
        .catch(err => {
            console.log(err);
        })
}

