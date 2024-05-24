const express = require('express');
const router = express.Router();
const candidateTest2Controller = require('../controllers/candidateTest2Controller');

router.get('/candidates-without-test', candidateTest2Controller.getCandidatesWithoutTest);

module.exports = router;
