const express = require('express');
const router = express.Router();
const question2Controller = require('../controllers/question2Controller');

router.get('/count', question2Controller.getQuestionCount);

module.exports = router;
