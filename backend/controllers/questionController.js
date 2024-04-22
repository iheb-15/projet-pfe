const RecinovQuestion = require('../models/Question');
const Feature = require('../models/Feature');
const RecinovAnswer = require('../models/answer'); 
const mongoose = require('mongoose');

exports.filterQuestions = async (req, res) => {
    try {
        
        const skillFilter = req.query.skill; 
        const questions = await RecinovQuestion.aggregate([
            {
              $match: { skill: skillFilter },
            },
            
          ]);
         res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des questions' });
    }
};



exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Feature.find().distinct('class');
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Feature.find().distinct('skill');
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 

exports.getAllAnswers = async (req, res) => {
    try {
      const answers = await RecinovAnswer.find();
      res.status(200).json(answers);
      console.log(answers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 
exports.getAllFeatures = async (req, res) => {
    
        try {
            
            const features = await Feature.aggregate([
                {
                    $match: { feature: 0 },
                },
            ])
                
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
                                _id: 1
                            };
                        } else {
                            
                            const answerField = lang === 'fr' ? 'answer_fr' : 'answer_en';
                            answerProjection = {
                                [answerField]: 1,
                                isCorrect: 1,
                                _id: 1
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


exports.getQuestionById = async (req, res) => {
    try {
      const question = await RecinovQuestion.findOne({ _id: req.params.id });
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };


  exports.getReponseById = async (req, res) => {
    try {
        // Use `find` to retrieve all responses that match the 'idQuestion'
        const responses = await RecinovAnswer.find({ idQuestion: req.params.idQuestion });

        // Check if any responses were found
        if (!responses || responses.length === 0) {
            return res.status(404).json({ message: 'No answers found for this question' });
        }

        // Send the found responses back to the client
        res.json(responses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

