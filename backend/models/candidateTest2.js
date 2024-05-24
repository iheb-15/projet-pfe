const mongoose = require('mongoose');

const candidateTest2Schema = new mongoose.Schema({
    candidateId: { type: String, required: true },
    testId: { type: String, required: true },
    score: { type: Number }
},{collection:'candidatetests'});

const CandidateTest2 = mongoose.model('CandidateTest2', candidateTest2Schema);

module.exports = CandidateTest2; 
