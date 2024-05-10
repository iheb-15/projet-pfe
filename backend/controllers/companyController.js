const mongoose = require('mongoose');
const Company = require('../models/Company');
const CompanyTestQuestion = require('../models/CompanyTestQuestion');
const Feature = require('../models/Feature');
const Question = require('../models/Questioncompany');
const Answer = require('../models/answercompany');

exports.createCompany = async (req, res) => {

  try {
    const { title,description,level,languages,} = req.body;

    const newCompany = new Company({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      level,
      languages,
      idQuestions: new mongoose.Types.ObjectId()
    });

    const savedCompany = await newCompany.save();

    const newtest = new CompanyTestQuestion({
      _id: savedCompany.idQuestions,
      idQuestions: [savedCompany._id]
  });
  await newtest.save();

    res.status(201).json(savedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message  });
  }
}; 


exports.CompanyTestQuestion = async (req, res) => {
  try {
    const { class: className, skill, ref, question_en, question_fr, level, points, time, answers } = req.body;

   
    const feature = new Feature({ class: className, skill, ref });
    await feature.save();
  
    
    const question = new Question({
      skill: feature.code, 
      question_en,
      question_fr,
      level,
      points,
      time
    });
    await question.save();

    
    let savedAnswers = [];
    for (const answer of answers) {
      const newAnswer = new Answer({
        idQuestion: question._id,
        isCorrect: answer.isCorrect,
        answer_en: answer.answer_en,
        answer_fr: answer.answer_fr
      });
      await newAnswer.save();
      savedAnswers.push(newAnswer);
    }

    // Server response with created objects
    res.status(201).send({
      feature: feature,
      question: question,
      answers: savedAnswers
    });

  } catch (error) {
    res.status(500).send({ message: 'Error processing combined request', error: error.message });
  }
};

























