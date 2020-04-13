"use strict";
const Report = require('../model/report');

//Register a solicitude
exports.postAddReport = async (req, res) => {
    const user = req.body.user;
    const date = req.body.date;
    const solicitude = req.body.solicitude;
    const description = req.body.description;

    const report = new Report(user, date, description, solicitude);
    report.save()
        .then(() => {
            res.status(200).json({ message: "Added" })
        })
        .catch(err => {
            console.log(err);
        });
}

//Obtener todas las solicitudes
exports.getAllReports = (req, res) => {
    const reportO = new Report();
    reportO.fetchAll()
        .then(reports => {
            res.status(200).json(reports);
        })
        .catch(err => {
            console.log(err);
        })
}

//Obtener todas las solicitudes con un usuario y/o fecha dados
exports.getReportsByFilter = (req, res) => {
    const reportO = new Report();
    const user = req.body.user;
    const date = req.body.date;
    const solicitude = req.body.solicitude;
    reportO.fetchFilter(user, date, solicitude)
        .then(reports => {
            res.status(200).json(reports);
        })
        .catch(err => {
            console.log(err);
        })
}