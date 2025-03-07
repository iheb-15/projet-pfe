const mongoose = require('mongoose');
const Company = require('../models/Company');
const CompanyTestQuestion = require('../models/CompanyTestQuestion');
const Feature = require('../models/Feature');
const Question = require('../models/Questioncompany');
const Answer = require('../models/answercompany');
const CompanyE = require('../models/Entreprise');

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


  

// exports.getAllCompanyNames = async (req, res) => {
//   try {
//     const companies = await CompanyE.find({}).select('name'); 
//     if (!companies || companies.length === 0) {
//       return res.status(404).send({ message: "No companies found" });
//     }

//     const companiesWithTitles = await Promise.all(companies.map(async (company) => {
//       const tests = await Company.find({ idCompany: company._id }, 'title description level languages idQuestions');
      
//       if (!tests || tests.length === 0) {
//         return { name: company.name, titles: [] };
//       }

//       const testsWithQuestions = await Promise.all(tests.map(async (test) => {
//         const companyTestQuestions = await CompanyTestQuestion.find({ _id: { $in: test.idQuestions } }, 'idQuestions');
        
//         if (!companyTestQuestions || companyTestQuestions.length === 0) {
//           return {
//             title: test.title,
//             description: test.description,
//             level: test.level,
//             languages: test.languages,
//             questions: []
//           };
//         }

//         const questionIds = companyTestQuestions.flatMap(ctq => ctq.idQuestions);
//         const questions = await Question.find({ _id: { $in: questionIds } }, 'question_fr question_en');
        
//         return {
//           title: test.title,
//           description: test.description,
//           level: test.level,
//           languages: test.languages,
//           questions: questions.map(question => ({
//             question_fr: question.question_fr,
//             question_en: question.question_en
//           }))
//         };
//       }));

//       return { 
//         name: company.name, 
//         titles: testsWithQuestions 
//       }; 
//     }));

//     res.send(companiesWithTitles);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// };
exports.getAllCompanyNames = async (req, res) => {
  try {
    const companies = await CompanyE.find({}).select('name'); 
    if (!companies || companies.length === 0) {
      return res.status(404).send({ message: "No companies found" });
    }

    const companiesWithTitles = await Promise.all(companies.map(async (company) => {
      const tests = await Company.find({ idCompany: company._id }, 'title description level languages idQuestions');
      
      if (!tests || tests.length === 0) {
        return { name: company.name, titles: [] };
      }

      const testsWithQuestions = await Promise.all(tests.map(async (test) => {
        const companyTestQuestions = await CompanyTestQuestion.find({ _id: { $in: test.idQuestions } }, 'idQuestions');
        
        if (!companyTestQuestions || companyTestQuestions.length === 0) {
          return {
            title: test.title,
            description: test.description,
            level: test.level,
            languages: test.languages,
            questions: []
          };
        }

        const questionIds = companyTestQuestions.flatMap(ctq => ctq.idQuestions);
        const questions = await Question.find({ _id: { $in: questionIds } }, ' question_fr question_en');

        const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
          const answers = await Answer.find({ idQuestion: question._id }, 'answer_fr answer_en');
          
          return {
            _id: question._id,
            question_fr: question.question_fr,
            question_en: question.question_en,
            answers: answers.map(answer => ({
              answer_fr: answer.answer_fr,
              answer_en: answer.answer_en
            }))
          };
        }));

        return {
          title: test.title,
          description: test.description,
          level: test.level,
          languages: test.languages,
          questions: questionsWithAnswers
        };
      }));

      return { 
        name: company.name, 
        titles: testsWithQuestions 
      }; 
    }));

    res.send(companiesWithTitles);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
