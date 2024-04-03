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
                console.log('Language:', lang);
            
                const questions = await RecinovQuestion.find({});
            
                if (questions.length === 0) {
                  return res.status(404).json({ message: 'No questions found' });
                }
            
                const responses = [];
            
                for (const question of questions) {
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
            
                  const answers = await RecinovAnswer.find({ idQuestion: question._id }, answerProjection);
            
                  let questionResponse;
                  if (!lang) {
                    questionResponse = {
                      question_fr: question.question_fr,
                      question_en: question.question_en,
                    };
                  } else {
                    questionResponse = lang === 'fr' ? question.question_fr : question.question_en;
                  }
            
                  
                  responses.push({
                    question: questionResponse,
                    answers
                  });
                }
            
                res.json(responses);
              } catch (error) {
                console.error('Failed to fetch questions and answers', error);
                res.status(500).json({ message: 'Server error' });
              }
            };

            // exports.getQuestionWithAnswers = async (req, res) => {
            //   try {
            //     const questionId = req.params.id;
            //     const lang = req.query.lang; 
            //     console.log('Question ID:', questionId, 'Language:', lang);
            
               
            //     const question = await RecinovQuestion.findById(questionId);
            //     if (!question) {
            //       return res.status(404).json({ message: 'Question not found' });
            //     }
            
            //     let answerProjection;
            //     if (!lang) {
                  
            //       answerProjection = {
            //         answer_fr: 1,
            //         answer_en: 1,
            //         isCorrect: 1,
            //         _id: 1
            //       };
            //     } else {
            //       const answerField = lang === 'fr' ? 'answer_fr' : 'answer_en';
            //       answerProjection = {
            //         answer: `$${answerField}`,
            //         isCorrect: 1,
            //         _id: 1
            //       };
            //     }
            
            //     const answers = await RecinovAnswer.aggregate([
            //       { $match: { idQuestion: question._id } },
            //       {
            //         $project: answerProjection
            //       }
            //     ]);
            
                
            //     let questionResponse;
            //     if (!lang) {
            //       questionResponse = {
            //         question_fr: question.question_fr,
            //         question_en: question.question_en,
            //       };
            //     } else {
            //       questionResponse = lang === 'fr' ? question.question_fr : question.question_en;
            //     }
            
            //     const response = {
            //       question: questionResponse,
            //       answers
            //     };
            
            //     res.json(response);
            //   } catch (error) {
            //     console.error('Failed to fetch question and answers', error);
            //     res.status(500).json({ message: 'Server error' });
            //   }
            // };