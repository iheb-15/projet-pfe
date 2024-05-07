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

exports.updateQuestionById = async (req, res) => {
    try {
        const { question_fr, question_en, time, level, points } = req.body;
        const updatedFields = {};
        console.log("body",req.body)
        console.log("all",question_fr, question_en, time, level, points);
        // Vérifiez qu'au moins une version de la question est fournie dans le corps de la requête
        if (question_fr) updatedFields.question_fr = question_fr;
        if (question_en) updatedFields.question_en = question_en;
        if (time) updatedFields.time = time;
        if (level) updatedFields.level = level;
        if (points) updatedFields.points = points;
        
        const updatedQuestion = await RecinovQuestion.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedFields }, // Utilise $set pour mettre à jour les champs spécifiés
            { new: true } // Pour renvoyer la version mise à jour de l'objet
        );
        
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        res.json(updatedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message  });
    }
};

exports.updateResponseById = async (req, res) => {
    try {
        const { answer_fr, answer_en, isCorrect } = req.body;
        const updatedFields = {};

        // Vérifiez qu'au moins une version de la réponse est fournie dans le corps de la requête
        if (answer_fr) updatedFields.answer_fr = answer_fr;
        if (answer_en) updatedFields.answer_en = answer_en;
        if (typeof isCorrect === 'boolean') updatedFields.isCorrect = isCorrect;
        
        const updatedResponse = await RecinovAnswer.findOneAndUpdate(
            { _id: req.params.id }, // Recherche par ID de réponse
            { $set: updatedFields }, // Utilise $set pour mettre à jour les champs spécifiés
            { new: true } // Pour renvoyer la version mise à jour de l'objet
        );

        // Vérifiez si la réponse a été mise à jour avec succès
        if (!updatedResponse) {
            return res.status(404).json({ message: 'Response not found' });
        }

        // Envoyer la réponse mise à jour au client
        res.json(updatedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};






exports.addQuestion = async (req, res) => {
    const {
      className,
      skillName,
      question_en,
      question_fr,
      level,
      points,
      time
    } = req.body;
  
    try {
      
      let classFeature = await Feature.findOne({ name: className });
      if (!classFeature) {
        classFeature = new Feature({ name: className });
        await classFeature.save();
      }
  
     
      let skillFeature = await Feature.findOne({ name: skillName });
      if (!skillFeature) {
        skillFeature = new Feature({ name: skillName });
        await skillFeature.save();
      }
  
      
      const newQuestion = new RecinovQuestion({
        class: classFeature._id,
        skill: skillFeature._id,
        question_en,
        question_fr,
        level,
        points,
        time
      });
  
      await newQuestion.save();
      res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (error) {
      res.status(500).json({ message: 'Error adding question', error: error.message });
    }
  };

  exports.ajouterFeature = async (req, res) => {
    try {
      const nouvelleFeature = new Feature(req.body);
      await nouvelleFeature.save();
      res.status(201).json({ success: true, message: 'Feature ajoutée avec succès' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout de la feature', error: error.message });
    }
  };

  
  exports.createFeatureAndAddQuestion = async (req, res) => {
    try {
      const { class: className, skill, ref, question_en, question_fr, level, points, time, answers } = req.body;
  
      // Création et sauvegarde de la nouvelle fonctionnalité
      const feature = new Feature({ class: className, skill, ref });
      await feature.save();
    
      // Création de l'entrée pour la question avec le code généré pour la fonctionnalité
      const recinovQuestion = new RecinovQuestion({
        skill: feature.code,
        question_en,
        question_fr,
        level,
        points,
        time
      });
      await recinovQuestion.save();
  
      // Création et sauvegarde des réponses associées à la question
      let savedAnswers = [];
      for (const answer of answers) {
        const recinovAnswer = new RecinovAnswer({
          idQuestion: recinovQuestion._id,
          isCorrect: answer.isCorrect,
          answer_en: answer.answer_en,
          answer_fr: answer.answer_fr
        });
        await recinovAnswer.save();
        savedAnswers.push(recinovAnswer);
      }
  
      // Réponse du serveur avec les objets créés
      res.status(201).send({
        feature: feature,
        question: recinovQuestion,
        answers: savedAnswers
      });
  
    } catch (error) {
      res.status(500).send({ message: 'Error processing combined request', error: error.message });
    }
  };
  
  exports.deleteQuestion = async (req, res) => {
    try {
      const result = await RecinovQuestion.findByIdAndRemove(req.params.id);
      if (!result) {
        return res.status(404).send('No question found with that ID');
      }
      res.send('Question deleted successfully');
    } catch (error) {
      res.status(500).send('Error deleting question: ' + error.message);
    }
  };
  