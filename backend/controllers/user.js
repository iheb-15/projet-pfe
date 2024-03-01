<<<<<<< HEAD
const User = require("../models/user")
const {validationResult, check} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
const bcrypt = require('bcryptjs');
require('express-async-errors');
const nodemailer = require('nodemailer');
require('dotenv').config();
 
=======
// controllers/user.js

const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Add new user
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b
exports.add = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

<<<<<<< HEAD
    const { name,lastname, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        lastname,
        password,
        role 
    });

    user.save((err, user) => {
=======
    const { name, lastname, email, password, role } = req.body;
    const user = new User({ name, lastname, email, password, role });

    user.save((err, newUser) => {
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            });
        }
<<<<<<< HEAD
        res.json({
            message: "User created successfully",
            user
        });
    });
};
=======

      
    });
};

// Update user based on role
exports.updateUser = (req, res) => {
    const { userId } = req.params;
    const { name, lastname, password, email } = req.body;

    User.findById(userId, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }

        // Check if the user is a super admin (role === 0)
        if (user.role === 0) {
            // Update name, lastname, password, and email
            user.name = name;
            user.lastname = lastname;
            user.password = password;
            user.email = email;
        } else {
            // For simple admin (role !== 0), only update password
            user.password = password;
        }

        user.save((err, updatedUser) => {
            if (err) {
                return res.status(400).json({
                    error: "Error updating user"
                });
            }

            // Exclude sensitive information like password before sending the response
            updatedUser.encry_password = undefined;
            updatedUser.salt = undefined;

            res.json(updatedUser);
        });
    });
};

// Delete user based on role
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the requesting user is allowed to delete based on their role
        if (req.user.role === 0) {
            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({
                    error: "User not found",
                });
            }

            return res.json({
                message: "User deleted successfully",
                user: deletedUser,
            });
        } else {
            return res.status(403).json({
                error: "Unauthorized",
            });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            error: "Unable to delete user",
        });
    }
};

// Sign in user
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b
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

// Sign out user
exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.json({
        message: "Vous êtes déconnecté"
    });
};
<<<<<<< HEAD
//envoyer un e-mail contenant le code de vérification à l'utilisateur.
exports.sendCodeEmail = async (email, code) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", //host pour utiliser SMTP avec Gmail
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
=======
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b
