const RecinovQuestion = require('../models/Question');

// Contrôleur pour filtrer les questions par langue, domaine et compétence
exports.filterQuestions = async (req, res) => {
    try {
        const languageCode = req.query.lang; // Langue spécifiée dans la requête
        let questionField = ''; // Initialiser la variable pour contenir le champ à sélectionner

        // Vérifier la langue spécifiée et sélectionner le champ de langue approprié
        if (languageCode === 'fr') {
            questionField = 'question_fr';
        } else if (languageCode === 'en') {
            questionField = 'question_en';
        } 

        // Créer un objet pour la sélection de champ basé sur la langue spécifiée
        // Si aucun code langue n'est fourni, sélectionner les deux champs
        const fieldsToSelect = languageCode ? { [questionField]: 1 } : { question_fr: 1, question_en: 1 };

        // Récupérer les questions avec le ou les champs spécifiés
        const questions = await RecinovQuestion.find({}, fieldsToSelect);

        res.json(questions); // Envoyer les questions récupérées
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des questions' });
    }
};




// exports.filterQuestions = async (req, res) => {
//     try {
//         const languageCode = req.query.lang; // Langue spécifiée dans la requête
//         let questionField = ''; // Initialiser la variable pour contenir le champ à sélectionner

//         // Vérifier la langue spécifiée et sélectionner le champ de langue approprié
//         if (languageCode === 'fr') {
//             questionField = 'question_fr';
//         } else if (languageCode === 'en') {
//             questionField = 'question_en';
//         }

//         // Créer un objet pour la sélection de champ basé sur la langue spécifiée
//         // Si aucun code langue n'est fourni, sélectionner les deux champs
//         let fieldsToSelect = languageCode ? { [questionField]: 1 } : { question_fr: 1, question_en: 1 };
        
//         // Assurer la sélection de l'_id pour chaque question
//         fieldsToSelect['_id'] = 1;

//         // Récupérer les questions avec le ou les champs spécifiés
//         const questions = await RecinovQuestion.find({}, fieldsToSelect);

//         // Si on veut également récupérer les réponses pour chaque question
//         // Supposons que RecinovAnswers ait un champ 'questionId' qui référence l'_id des questions
//         const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
//             const answers = await RecinovAnswers.find({ questionId: question._id });
//             return {
//                 ...question.toObject(), // Convertir le document Mongoose en objet simple
//                 answers, // Ajouter les réponses trouvées
//             };
//         }));

//         res.json(questionsWithAnswers); // Envoyer les questions avec les réponses récupérées
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur lors de la récupération des questions et réponses' });
//     }
// };
