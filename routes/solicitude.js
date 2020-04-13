var express = require("express");
var router = express.Router();

const sc = require("../controller/solicitude");

/* POST: Add a new Solicitude */
router.post("/add", sc.postAddSolicitude);

/* GET: get all Solicitudes */
router.get("/list", sc.getAllSolicitudes);

/* POST: Get a set of Solicitudes by filter */
router.post("/get", sc.getSolicitudesByFilter);


module.exports = router;