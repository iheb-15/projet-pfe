// routes/company2Routes.js
const express = require('express');
const router = express.Router();
const company2Controller = require('../controllers/company2Controller');

router.get('/count', company2Controller.getCompany2Count);

module.exports = router;
