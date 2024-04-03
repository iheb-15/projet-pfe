const mongoose = require('mongoose');


const featureSchema = new mongoose.Schema({
  class: String,
  skill: String,
  ref: String
});


const Feature = mongoose.model('features', featureSchema);
module.exports = Feature; 
    
    