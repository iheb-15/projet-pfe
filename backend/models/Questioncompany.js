const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  question_fr: { type: String, required: true },
  question_en: { type: String, required: true }
}, {collection: 'questions'});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;