<<<<<<< HEAD
const mongoose = require('mongoose');


const featureSchema = new mongoose.Schema({
  class: String,
  skill: String,
  ref: String
});


const Feature = mongoose.model('features', featureSchema);
module.exports = Feature; 
    
    
=======
// models/Feature.js

const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    class: String,
    skill: String,
        language: { type: String, enum: ['francais', 'arabe', 'anglais'] },
        questionType: { type: String, enum: ['choix_multiple', 'vrai_ou_faux', 'ouvert'] },
        level: { type: String, enum: ['debutant', 'intermediaire', 'avance'] },
        domain: String,
        time: Number, // Temps en minutes
        questionArea: String,
        responseType: { type: String, enum: ['texte'] },
        response: String,
        isCorrect: Boolean
    });


const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
>>>>>>> 2a16c3f1642f1760398a8cb5d235cc408d136f96
