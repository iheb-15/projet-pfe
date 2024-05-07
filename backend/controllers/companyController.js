const mongoose = require('mongoose');
const Company = require('../models/Company');
// const CompanyTestQuestion = require('../models/CompanyTestQuestion');
const CompanyTestQuestion = require('../models/CompanyTestQuestion');
exports.createCompany = async (req, res) => {

    try {
      const {
        idCompany,
        title,
        description,
        deleted,
        tagged,
        link,
        updatedAt,
        correctionType,
        globalStopwatch,
        languages,
        level,
        showResult,
        validity,
      } = req.body;
  
      const newCompany = new Company({
        _id: new mongoose.Types.ObjectId(),
        idCompany,
        title,
        description,
        deleted,
        tagged,
        link,
        updatedAt: new Date(updatedAt),
        correctionType,
        globalStopwatch,
        languages,
        level,
        showResult,
        validity,
        idQuestions: new mongoose.Types.ObjectId()
      });
  
      const savedCompany = await newCompany.save();
      res.status(201).json(savedCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message  });
    }
  };
  


exports.createCompanyTestQuestion = async (req, res) => {
  try {
    const {
      idQuestions,
      
    } = req.body;

    // Créer une nouvelle instance de CompanyTestQuestion
    const newCompanyTestQuestion = new CompanyTestQuestion({
      _id: new mongoose.Types.ObjectId(), 
      idQuestions, 
      
    });

    // Sauvegarder la nouvelle question dans la base de données
    const savedCompanyTestQuestion = await newCompanyTestQuestion.save();

    // Répondre avec la question nouvellement créée
    res.status(201).json(savedCompanyTestQuestion);
  } catch (err) {
    console.error(err);
    // En cas d'erreur, répondre avec un statut 500 et un message d'erreur
    res.status(500).json({ error: 'Server Error' });
  }
};


