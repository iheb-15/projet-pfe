const mongoose = require('mongoose');


 const featureSchema = new mongoose.Schema({
      name: String,
      class: {
        type: String, 
        ref: 'feature:0' 
      },
      skill: {
        type: String, 
        ref: 'feature:0 ' 
      }
    }, { collection: 'features', timestamps: true });
    
    module.exports = mongoose.model('Feature', featureSchema);
    
    
    