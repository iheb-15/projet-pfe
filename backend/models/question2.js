const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: Number, // Champ entier pour le type de question
    time: Number, // Champ entier pour le temps
    level: Number, // Champ entier pour le niveau
    points: Number // Champ entier pour les points
    // Ajoutez d'autres champs nécessaires pour votre collection
}, {collection:'questions'});

const Question2 = mongoose.model('Question2', questionSchema);

module.exports = Question2;

