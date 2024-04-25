
const mongoose = require('mongoose');
const crypto = require("crypto"); 
const uuidv1 = require("uuid/v1"); 
const { ObjectId } = mongoose.Schema; 
const bcrypt = require("bcryptjs"); 
const { promisify } = require('util');

const featureSchema = new mongoose.Schema({
  class: String,
  skill: String,
  code: String,
  code: { type: String, default: '', unique: true },
  ref: String
},{collection:'features'}
);



// Function to generate a unique code
async function generateUniqueCode(base, Feature) {
  const randomNumber = Math.floor(Math.random() * 1000); // Generates a number from 0 to 999
  const potentialCode = `${base}_${randomNumber}`;
  const exists = await Feature.findOne({ code: potentialCode }).exec();
  return exists ? await generateUniqueCode(base, Feature) : potentialCode;
}

// Pre-save middleware
featureSchema.pre('save', async function(next) {
  const base = this.class && this.class.length >= 4 ? this.class.substring(0, 4) : this.class;
  this.code = await generateUniqueCode(base, mongoose.model('Feature'));
  next();
});


module.exports = mongoose.model("Feature", featureSchema);