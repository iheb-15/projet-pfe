const mongoose = require('mongoose');
const crypto = require("crypto"); 
const uuidv1 = require("uuid/v1"); 
const { ObjectId } = mongoose.Schema; 
const bcrypt = require("bcryptjs"); 
const { promisify } = require('util');



const recinovQuestionSchema = new mongoose.Schema({
  question_en: String,
  question_fr: String,
  reponse: String,
  langue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
  },
  // Ajouter une référence à la table RecinovAnswers
  // answers: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'RecinovAnswer'
  // }]
}, { collection: 'recinovquestions', timestamps: true });

module.exports = mongoose.model('RecinovQuestion', recinovQuestionSchema);

