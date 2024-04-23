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
