const mongoose = require('mongoose');


const recinovAnswerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecinovQuestion',
    required: true
  },
  answer_en: String,
  answer_fr: String,
}, { collection: 'recinovanswers', timestamps: true });

module.exports = mongoose.model('RecinovAnswer', recinovAnswerSchema);