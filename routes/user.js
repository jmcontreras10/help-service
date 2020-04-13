var express = require('express');
var router = express.Router();

const uc = require('../controller/user');

/* POST: Add a new User */
router.post('/add', uc.postAddUser);

/* GET: get all Users */
router.get('/list', uc.getAllUsers);

/* GET: Get a set of Users by filter */
router.get('/get', uc.getUsersByFilter);

/* PUT: Modify User info */
router.put('/update', uc.modifyUserById);

module.exports = router;
