const mongoose = require('mongoose');


const recinovAnswerSchema = new mongoose.Schema({
  answer: String,
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecinovQuestion' 
  },
  langue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language' 
  }
}, { collection: 'recinovanswers', timestamps: true });
module.exports = mongoose.model('RecinovAnswer', recinovAnswerSchema);