const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  skill: String,
  question_en: String,
  question_fr: String,
  level: Number,
  points: Number,
  time: Number,
  isArchived: { type: Boolean, default: false },
}, {collection: 'questions'});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;