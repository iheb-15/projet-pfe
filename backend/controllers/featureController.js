// controllers/featureController.js

const Feature = require('../models/Feature');

exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Feature.find().distinct('class');
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Feature.find().distinct('skill');
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.addQuestion = async (req, res) => {
    const {
        classType,
        skill,
        language,
        questionType,
        level,
        domain,
        time,
        questionArea,
        responseType,
        response,
        isCorrect
    } = req.body;
    const feature = new Feature({
        class: classType,
        skill,
        language,
        questionType,
        level,
        domain,
        time,
        questionArea,
        responseType,
        response,
        isCorrect
    });
    try {
        const newFeature = await feature.save();
        res.status(201).json(newFeature);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};