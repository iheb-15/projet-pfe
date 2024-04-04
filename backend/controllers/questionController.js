const RecinovQuestion = require('../models/Question');
const Feature = require('../models/Feature');
const RecinovAnswer = require('../models/answer'); 
const mongoose = require('mongoose');

exports.filterQuestions = async (req, res) => {
    try {
        const languageCode = req.query.lang; 
        let questionField = ''; 

        
        if (languageCode === 'fr') {
            questionField = 'question_fr';
        } else if (languageCode === 'en') {
            questionField = 'question_en';
        } 

        const fieldsToSelect = languageCode ? { [questionField]: 1 } : { question_fr: 1, question_en: 1 };

        
        const questions = await RecinovQuestion.find({}, fieldsToSelect);

        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des questions' });
    }
};
     

            // quand utilise le ce code  de filtrage il a entrer dans boucle infinie



// exports.filterQuestions = async (req, res) => {
//     try {
//         const languageCode = req.query.lang; 
//         let questionField = ''; 

        
//         if (languageCode === 'fr') {
//             questionField = 'question_fr';
//         } else if (languageCode === 'en') {
//             questionField = 'question_en';
//         } 

      
//         const fieldsToSelect = languageCode ? { [questionField]: 1 } : { question_fr: 1, question_en: 1 };

        
//         let questions = await RecinovQuestion.find({}, fieldsToSelect);

//         for (let i = 0; i < questions.length; i++) {
//             const questionId = questions[i]._id;
//             const answers = await RecinovAnswer.find({ idQuestion: questionId });

           
//             questions[i].answers = answers;
//         }

//         res.json(questions); 
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur lors de la récupération des questions' });
//     }
// };

exports.getAllAnswers = async (req, res) => {
    try {
      const answers = await RecinovAnswer.find();
      res.status(200).json(answers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 
exports.getAllFeatures = async (req, res) => {
    
        try {
            
            const features = await Feature.find(req.query).select('skill class');
            res.json(features);
          } catch (error) {
            res.status(500).send({ message: error.message });
          } };
          exports.getQuestionWithAnswers = async (req, res) => {


  try {
    const lang = req.query.lang; 

   
    const questions = await RecinovQuestion.find({});
    if (!questions.length) {
        return res.status(404).json({ message: 'No questions found' });
    }

    let answerProjection;
    if (!lang) {
        
        answerProjection = {
            answer_fr: 1,
            answer_en: 1,
            isCorrect: 1,
            _id: 0 
        };
    } else {
        
        const answerField = lang === 'fr' ? 'answer_fr' : 'answer_en';
        answerProjection = {
            [answerField]: 1,
            isCorrect: 1,
            _id: 0 
        };
    }

    
    const answers = await RecinovAnswer.aggregate([
        { $match: { idQuestion: { $in: questions.map(question => question._id) } } }, 
        { $project: answerProjection }
    ]);

    
    const response = questions.map((question, index) => {
        let questionResponse;
        if (!lang) {
            
            questionResponse = {
                id: question._id,
                question_fr: question.question_fr,
                question_en: question.question_en,
            };
        } else {
            
            questionResponse = lang === 'fr' ? question.question_fr : question.question_en;
        }
        return {
            id: question._id,
            question: questionResponse,
            answers: answers[index] 
        };
    });

    res.json(response);
} catch (error) {
    console.error('Failed to fetch questions and answers', error);
    res.status(500).json({ error: error.message });
}
          };