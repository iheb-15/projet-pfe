// models/company2.js
const mongoose = require('mongoose');

const company2Schema = new mongoose.Schema({
  name: String,
  // Ajoutez d'autres champs selon vos besoins
}, {collection:'companies'}
);

const Company2 = mongoose.model('Company2', company2Schema);

module.exports = Company2;


