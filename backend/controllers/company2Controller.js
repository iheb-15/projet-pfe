// controllers/company2Controller.js
const Company2 = require('../models/company2');

exports.getCompany2Count = async (req, res) => {
  try {
    const count = await Company2.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};

