// controllers/candidateTestController.js
const CandidateTest = require('../models/CandidateTest');

exports.getCandidatesWithScore = async (req, res) => {
  try {
    const count = await CandidateTest.countDocuments({ score: { $exists: true } });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
