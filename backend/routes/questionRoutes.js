const express = require('express');
const router = express.Router();
const recinovQuestionController = require('../controllers/questionController');
const recinovAnswerController = require('../controllers/questionController');
const featureController = require('../controllers/questionController');
const { getQuestionWithAnswers } = require('../controllers/questionController');


router.get('/questions/answers', getQuestionWithAnswers);
router.get('/questions', recinovQuestionController.filterQuestions);
router.get('/answer', recinovAnswerController.getAllAnswers);
router.get('/features', featureController.getAllFeatures);


module.exports = router;