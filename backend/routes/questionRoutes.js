const express = require('express');
const router = express.Router();
const recinovQuestionController = require('../controllers/questionController');
const recinovAnswerController = require('../controllers/questionController');
const featureController = require('../controllers/questionController');
const { getQuestionWithAnswers } = require('../controllers/questionController');
const questionController = require('../controllers/questionController');
const act = require('../controllers/questionController');
const tt = require('../controllers/questionController');
const featureControllers=require('../controllers/featureController');
const ajouter = require('../controllers/questionController');
const recinovAnswer = require('../controllers/answersContriller');
const deletes = require('../controllers/questionController');
const arti= require ('../controllers/questionController');
const RecinovQuestion = require('../models/Question');
const { unarchiveQuestion} = require('../controllers/questionController');



router.get('/questions/answers', getQuestionWithAnswers);
router.get('/questions', recinovQuestionController.filterQuestions);
router.get('/answer', recinovAnswerController.getAllAnswers);
router.get('/features', featureController.getAllFeatures);

router.get('/domaines', featureController.getAllClasses);
router.get('/competences', featureController.getAllSkills);
router.get('/questions/:id', questionController.getQuestionById);
router.get('/reponse/:idQuestion', act.getReponseById);
router.put('/questionsupdate/:id', questionController.updateQuestionById);
router.put('/Reponseupdate/:id', questionController.updateResponseById);
router.post('/answers/:idQuestion', questionController.addResponseToQuestion);

router.post('/ajoutquestions', questionController.addQuestion);
router.post('/features', tt.ajouterFeature);

router.post('/features/aa', featureControllers.createFeature);
router.get('/features', featureControllers.getFeature);
router.post('/transferCode', ajouter.createFeatureAndAddQuestion);




router.post('/recinovanswers', recinovAnswer.createAnswer);
router.get('/recinovanswers', recinovAnswer.getAnswers);



router.patch('/:id', deletes.deleteQuestion);
router.get('/archive/question', arti.getArchivedQuestions);
router.patch('/unarchiveQuestion/:id', unarchiveQuestion);


module.exports = router;