const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const companySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyE' // Référence au modèle CompanyE
    },
    
      title: {
        type: String,
        required: true,
        // ref: 'CompanyE'
      },
      description: {
        type: String,
        required: true
      },
     
      languages: {
        type: [String],
        required: true
      },
      level: {
        type: Number,
        default: 0
      },
    idQuestions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companytestquestions' 
  }]
},{collection:'companytests', timestamps: true});


const Company = mongoose.model('Company', companySchema);

module.exports = Company;

