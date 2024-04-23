// routes/featureRoutes.js

const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

router.get('/domaines', featureController.getAllClasses);
router.get('/competences', featureController.getAllSkills);
router.post('/ajouter-question', featureController.addQuestion);

module.exports = router;
