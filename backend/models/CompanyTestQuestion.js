const mongoose = require('mongoose');

const companyTestQuestionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idQuestions: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company' 
}
},{collection:'companytestquestions', timestamps: true}
);

const CompanyTestQuestion = mongoose.model('CompanyTestQuestion', companyTestQuestionSchema);

module.exports = CompanyTestQuestion;