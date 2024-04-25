const RecinovAnswer =require('../models/answer')
exports.createAnswer = async (req, res) => {
    try {
      const { idQuestion, isCorrect, answer_en, answer_fr } = req.body;
      const newAnswer = new RecinovAnswer({
        idQuestion,
        isCorrect,
        answer_en,
        answer_fr
      });
  
      await newAnswer.save();
      res.status(201).send(newAnswer);
    } catch (error) {
      res.status(500).send({ message: 'Error creating answer', error: error.message });
    }
  };
  
  exports.getAnswers = async (req, res) => {
    try {
      const answers = await RecinovAnswer.find().populate('idQuestion');
      res.status(200).send(answers);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching answers', error: error.message });
    }
  };