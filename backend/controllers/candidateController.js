// controllers/candidateController.js
const Candidate = require('../models/candidate');

exports.getCandidatesCount = async (req, res) => {
    try {
        const count = await Candidate.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
};
