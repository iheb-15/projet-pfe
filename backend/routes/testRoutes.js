const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/count', testController.getTestCount);

module.exports = router;
