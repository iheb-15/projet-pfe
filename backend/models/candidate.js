// models/candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
   
    email: String,
    // Ajoutez d'autres champs selon vos besoins
}, {collection:'candidates'}
);

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
