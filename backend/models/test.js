const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    // Définissez les champs de votre collection ici
    // Par exemple:
    question: String,
    answers: String,
}, {collection:'test'}
);

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
