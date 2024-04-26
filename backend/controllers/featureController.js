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










exports.createFeature = async (req, res) => {
  try {
    const { class: className, skill, ref } = req.body;
    const feature = new Feature({ class: className, skill, ref });
    await feature.save();
    res.status(201).send(feature);
  } catch (error) {
    res.status(500).send({ message: 'Error creating feature', error: error.message });
  }
};

exports.getFeature = async (req, res) => {
  try {
    const features = await Feature.find();
    res.status(200).send(features);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching features', error: error.message });
  }
};