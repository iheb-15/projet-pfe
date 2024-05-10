const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  idQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, // Reference to Question model
  isCorrect: Boolean,
  answer_en: String,
  answer_fr: String
}, {collection: 'answers'});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
