// routes/candidateRoutes.js
const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

router.get('/count', candidateController.getCandidatesCount);

module.exports = router;
