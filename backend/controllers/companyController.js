const mongoose = require('mongoose');
const Company = require('../models/Company');
const CompanyTestQuestion = require('../models/CompanyTestQuestion');


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




























