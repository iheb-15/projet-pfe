const CandidateTest2 = require('../models/candidateTest2');

exports.getCandidatesWithoutTest = async (req, res) => {
    try {
        const count = await CandidateTest2.countDocuments({ score: { $exists: false } });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
