// routes/candidateTestRoutes.js
const express = require('express');
const router = express.Router();
const { getCandidatesWithScore } = require('../controllers/candidateTestController');

router.get('/candidates/with-score', getCandidatesWithScore);

module.exports = router;
