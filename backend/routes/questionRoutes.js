const express = require('express');
const router = express.Router();
const recinovQuestionController = require('../controllers/questionController');
// const languageController   = require('../controllers/questionController');


// Route pour filtrer les questions
router.get('/filter', recinovQuestionController.filterQuestions);
// router.post('/filterlangue', languageController.filterLanguages);
// router.get('/:languageName/:className/:skillName', questionController.getQuestionsByCriteria);

// router.get('/filter', async (req, res) => {
//     try {
//         const languageCode = req.query.lang; // Langue spécifiée dans la requête
//         const filterQuery = { [`${languageCode}`]: { $exists: true } }; // Construire le filtre

//         // Récupérer uniquement la question dans la langue spécifiée
//         const questions = await recinovQuestion.find(filterQuery).select('question');

//         res.json(questions); // Envoyer les questions récupérées
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur lors de la récupération des questions' });
//     }
// });
module.exports = router;