// models/CandidateTest.js
const mongoose = require('mongoose');

const candidateTestSchema = new mongoose.Schema({
  candidateId: { type: String, required: true },
  testId: { type: String, required: true },
  score: { type: Number }
},{collection:'candidatetests'});

const CandidateTest = mongoose.model('CandidateTest', candidateTestSchema);

module.exports = CandidateTest;
