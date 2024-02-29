const User = require("../models/user")
const {validationResult, check} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
const bcrypt = require('bcryptjs');
require('express-async-errors');
const nodemailer = require('nodemailer');
require('dotenv').config();
// 
exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    const { name, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        password,
        role // Ajout du rôle
    });

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            });
        }
        res.json({
            message: "User created successfully",
            user
        });
    });
};
exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Utilisateur avec cette email n'existe pas."
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email ou mot de passe invalide."
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.cookie('token', token, { expires: new Date(Date.now() + 1) });
         const { _id, name, email } = user;
        return res.json({
            token,
            user: { _id, name, email }
        });
    });
};


exports.signout = (req, res) => {
    
    res.clearCookie("token");
    return res.json({
        message: "vous-êtes déconnecter"
    });
};
//envoyer un e-mail contenant le code de vérification à l'utilisateur.
exports.sendCodeEmail = async (email, code) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "nguiliiheb760@gmail.com",
        port: 587, // Port pour TLS/StartTLS
        secure: false, // utiliser true sur le port 465
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Votre code de vérification',
        text: `Voici votre code de vérification : ${code}`,
        html: `<p>Voici votre code de vérification : <strong>${code}</strong></p>`
      };
  
      let info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail : ', error);
    }
  };
  
  //  réinitialiser le mot de passe
 exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Token invalide ou expiré' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();
  
      res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    }
  };