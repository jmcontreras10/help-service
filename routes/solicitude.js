var express = require("express");
var router = express.Router();

const sc = require("../controller/solicitude");
//postAllRequests
/* POST: Add a new Solicitude */
router.post("/add", sc.postAddSolicitude);
//getAllRequest
/* GET: get all Solicitudes */
router.get("/list", sc.getAllSolicitudes);
//getRequestsByFilter
/* POST: Get a set of Solicitudes by filter */
router.post("/get", sc.getSolicitudesByFilter);


module.exports = router;
