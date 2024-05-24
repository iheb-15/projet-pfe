const Test = require('../models/test');

exports.getTestCount = async (req, res) => {
    try {
        const count = await Test.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du nombre de tests' });
    }
};
