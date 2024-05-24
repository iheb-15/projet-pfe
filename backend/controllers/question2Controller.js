const Question2 = require('../models/question2');

exports.getQuestionCount = async (req, res) => {
    try {
        const count = await Question2.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};
