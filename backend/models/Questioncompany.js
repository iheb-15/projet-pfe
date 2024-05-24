const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  question_fr: { type: String,  },
  question_en: { type: String,  }
}, {collection: 'questions'});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;