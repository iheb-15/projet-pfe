const express = require('express');
const router = express.Router();
const recinovQuestionController = require('../controllers/questionController');
const recinovAnswerController = require('../controllers/questionController');
const featureController = require('../controllers/questionController');
const { getQuestionWithAnswers } = require('../controllers/questionController');
const questionController = require('../controllers/questionController');
const act = require('../controllers/questionController');


router.get('/questions/answers', getQuestionWithAnswers);
router.get('/questions', recinovQuestionController.filterQuestions);
router.get('/answer', recinovAnswerController.getAllAnswers);
router.get('/features', featureController.getAllFeatures);

router.get('/domaines', featureController.getAllClasses);
router.get('/competences', featureController.getAllSkills);
router.get('/questions/:id', questionController.getQuestionById);
router.get('/reponse/:idQuestion', act.getReponseById);
module.exports = router;