var express = require('express');
var router = express.Router();

const rc = require('../controller/report');

/* POST: Add a new Solicitude */
router.post('/add', rc.postAddReport);

/* GET: get all Solicitudes */
router.get('/list', rc.getAllReports);

/* POST: Get a set of Solicitudes by filter */
router.post('/get', rc.getReportsByFilter);

module.exports = router;