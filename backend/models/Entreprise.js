const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const companySchema = new mongoose.Schema({
  name: String,

}, { collection: 'companies' });  
const CompanyE = mongoose.model('CompanyE', companySchema);

module.exports = CompanyE;