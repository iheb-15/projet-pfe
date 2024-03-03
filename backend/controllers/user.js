const User = require("../models/user")
const {validationResult, check} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
const bcrypt = require('bcryptjs');
require('express-async-errors');
const nodemailer = require('nodemailer');
const saltRounds = 10;
require('dotenv').config();


exports.add = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    const { name, lastname, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        lastname,
        password,
        role
    });

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            });
            
        }console.log(err);
        res.json({
            message: "User créer avec succées",
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
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.forgotPassword = function(req, res) {
     User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.error('Utilisateur ayant détecté une erreur:', err);
            return res.status(500).send('Une erreur s\'est produite.');
        }

        if (!user) {
            return res.status(400).send('Aucun compte avec cette adresse e-mail n\’existe.');
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 600000; // OTP expires in 10 minutes

        user.save(function(err) {
            if (err) {
                console.error('Erreur lors de l\’enregistrement des données utilisateur :', err);
                return res.status(500).send('Une erreur s\'est produite.');
            }

            const mailOptions = {
                to: user.email,
                from: 'nguiliiheb760@gmail.com',
                subject: 'Password Reset OTP',
                text: `Your OTP for password reset is: ${otp}`
            };

            transporter.sendMail(mailOptions, function(err) {
                if (err) {
                    console.error('Erreur lors de l’envoi du email:', err);
                    return res.status(500).send('Une erreur s\'est produite.');
                }
                res.status(200).send('Un OTP a été envoyé à votre adresse e-mail.\n merci de vérifier votre email');
            });
        });
    });
};


exports.resetPasswordWithOTP = (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Recherche de l'utilisateur en fonction de l'e-mail, de l'OTP et de la date d'expiration de l'OTP
    User.findOne({ email, otp, otpExpires: { $gt: Date.now() } }, (err, user) => {
        if (err) {
            console.error('Erreur lors de la recherche de l\'utilisateur :', err);
            return res.status(500).send('Une erreur s\'est produite lors de la recherche de l\'utilisateur.');
        }
        if (!user) {
            console.log('Aucun utilisateur trouvé.');
            return res.status(400).send('OTP non valide ou expiré.');
        }

        // Hachage du nouveau mot de passe avant de le sauvegarder
        bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error('Erreur lors du hachage du nouveau mot de passe :', err);
                return res.status(500).send('Une erreur s\'est produite lors de la mise à jour du mot de passe.');
            }

            // Mise à jour du mot de passe haché
            user.password = hashedPassword;
            user.otp = undefined; // Supprimer l'OTP après la réinitialisation du mot de passe
            user.otpExpires = undefined; // Supprimer la date d'expiration de l'OTP

            user.save((err) => {
                if (err) {
                    console.error('Erreur lors de la sauvegarde des données utilisateur :', err);
                    return res.status(500).send('Une erreur s\'est produite lors de la sauvegarde des données utilisateur.');
                }
                

                // Recherche de l'utilisateur avec le nouvel e-mail et le nouveau mot de passe
                User.findOne({ email, password: hashedPassword }, (err, user) => {
                    if (err || !user) {
                        return res.status(400).json({
                            error: "Erreur lors de la connexion automatique après la réinitialisation du mot de passe."
                        });
                    }
                    // Création du jeton d'authentification
                    const token = jwt.sign({ _id: user._id  }, process.env.SECRET);
                    // Enregistrement du jeton dans les cookies
                    res.cookie('token', token, { expires: new Date(Date.now() + 1) });
                  
                    const { _id, name, email } = user;
                    return res.json({
                        token,
                        user: { _id, name, email }
                    });
                });
            });
        });
    });
};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();// pour générer code entre 0 et 899999 avec l'ajout de 100000 pour le code
}
