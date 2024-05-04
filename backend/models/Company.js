const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idCompany: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      deleted: {
        type: Boolean,
        default: false
      },
      tagged: {
        type: Boolean,
        default: true
      },
      link: {
        type: String,
        required: true
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      correctionType: {
        type: Number,
        default: 0
      },
      globalStopwatch: {
        type: Boolean,
        default: false
      },
      languages: {
        type: [String],
        required: true
      },
      level: {
        type: Number,
        default: 0
      },
      showResult: {
        type: Boolean,
        default: true
      },
      validity: {
        type: Number,
        required: true
      },
    //   idQuestions: {
    //     type: String,
    //     required: true
    //   }
    idQuestions: [{ type: mongoose.Schema.Types.ObjectId }],
},{collection:'companytests', timestamps: true});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;