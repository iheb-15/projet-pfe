
const User = require("../models/user")
const {validationResult, check} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
const bcrypt = require('bcryptjs');
require('express-async-errors');
const nodemailer = require('nodemailer');
const saltRounds = 10;
require('dotenv').config();
const base64 = require('base64-js');


exports.singnup = (req, res) => {
    // Validate user inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    const { name, lastname, email, password, role } = req.body;

    // Create a new user instance
    const user = new User({
        name,
        email,
        lastname,
        password,
        role
    });

    // Save the new user to the database
    user.save((err, savedUser) => {
        if (err) {
            // Handle error if user creation fails
            console.log(err); // Log the error for debugging purposes
            return res.status(400).json({
                error: "Impossible d'ajouter un utilisateur"
            });
        }
        // Respond with a success message and user details
        res.json({
            message: "Utilisateur créé avec succès",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                password:savedUser.password,
                lastname: savedUser.lastname,
                role: savedUser.role
            }
        });
    });
}


// Fonction de contrôleur pour ajouter un nouvel utilisateur

exports.add = (req, res) => {
    // Validate user inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    const { name, lastname, email, password, role } = req.body;

    // Create a new user instance
    const user = new User({
        name,
        email,
        lastname,
        password,
        role
    });

    // Save the new user to the database
    user.save((err, savedUser) => {
        if (err) {
            // Handle error if user creation fails
            console.log(err); // Log the error for debugging purposes
            return res.status(400).json({
                error: "Impossible d'ajouter un utilisateur"
            });
        }
        // Respond with a success message and user details
        res.json({
            message: "Utilisateur créé avec succès",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                password:savedUser.password,
                lastname: savedUser.lastname,
                role: savedUser.role
            }
        });
    });
}

//Fonction de contrôleur pour mettre à jour les détails de l'utilisateur
exports.update = async (req, res) => {
    // Valider les entrées utilisateur
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extraire l'ID utilisateur et les détails de la demande
    const userId = req.params.userId;
    const { name, lastname, email, password, role } = req.body;

    try {
        // Trouver l'utilisateur par ID dans la base de données
        const user = await User.findById(userId);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        // Vérifiez le rôle de l'utilisateur et mettez à jour les champs en conséquence
        if (role === 0) {
            // Super admin peut modifier tous les champs
            user.name = name;
            user.lastname = lastname;
            user.email = email;
            user.password = password; // crypter le mot de passe
        } else if (role === 1) {
            // simple admin  ne peut modifier que le mot de passe
            user.password = password; // crypter le mot de passere
        } else {
            // Rôle non valide
            return res.status(400).json({ error: 'Rôle non valide' });
        }

        // Enregistrez les détails de l'utilisateur mis à jour dans la base de données
        await user.save();

        // Enregistrez les détails de l'utilisateur mis à jour dans la base de données
        res.json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
        // Gérer les erreurs internes du serveur
        console.error(error);
        res.status(500).json({ error: 'Erreur Interne du Serveur' });
    }
};

// Fonction de contrôleur pour supprimer un utilisateur
exports.delete = async (req, res) => {
    // Extraire l'ID utilisateur des paramètres de la requête
    const userId = req.params.userId;

    try {
        // Trouver l'utilisateur par ID dans la base de données
        const user = await User.findById(userId);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        // Supprimer l'utilisateur de la base de données
        await user.remove();

        // Répondez avec un message de réussite et les détails de l'utilisateur supprimés
        res.json({ message: 'Utilisateur supprimé avec succès', user });
    } catch (error) {
        // Gérer les erreurs internes du serveur
        console.error(error);
        res.status(500).json({ error: 'Erreur Interne du Serveur' });
    }
};

// Fonction de contrôleur pour gérer la connexion de l'utilisateur
exports.signin = (req, res) => {
    // Extraire l'e-mail et le mot de passe du corps de la requête
    const { email, password } = req.body;

    // Retrouver l'utilisateur par email dans la base de données
    User.findOne({ email }, (err, user) => {
        // Vérifier les erreurs ou si l'utilisateur n'existe pas
        if (err || !user) {
            return res.status(400).json({
                error: "L'utilisateur avec cet email n'existe pas."
            });
        }

        // Authentifier l'utilisateur avec le mot de passe fourni
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email ou mot de passe invalide."
            });
        }

        // Générer un JSON Web Token (JWT) pour l'authentification
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        // Définissez le token  en tant que bcookie dans la réponse
        res.cookie('token', token, { expires: new Date(Date.now() + 1) });

        // Extraire les détails pertinents de l'utilisateur
        const { _id, name, email } = user;

        // Répondez avec le jeton et les détails de l'utilisateur
        return res.json({
            token,
            user: { _id, name, email }
        });
    });
};

// Fonction de contrôleur pour gérer la déconnexion de l'utilisateur
exports.signout = (req, res) => {
    // Effacer le cookie de jeton d'authentification
    res.clearCookie("token");

    // Répondez avec un message de déconnexion
    return res.json({
        message: "Vous avez été déconnecté avec succès."
    });
};



// Créer un transporteur nodemailer pour l'envoi d'e-mails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS
    }
});



// Fonction de contrôleur pour gérer la demande de réinitialisation du mot de passe de l'utilisateur
exports.forgotPassword = function(req, res) {
    // Find the user by email in the database
    User.findOne({ email: req.body.email }, function(err, user) {
        // Handle errors
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).send('Une erreur est survenue.');
        }

        // Check if the user exists
        if (!user) {
            return res.status(400).send('No account with this email address exists.');
        }

        // Generate OTP
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 600000; // OTP expires in 10 minutes

        // Save the OTP to the user in the database
        user.save(function(err) {
            // Handle errors during OTP save
            if (err) {
                console.error('Erreur lors de l’enregistrement des données utilisateur :', err);
                return res.status(500).send('Une erreur s\'est produite.');
            }

            // Configure email options with OTP
            const mailOptions = {
                to: user.email,
                from: 'nguiliiheb760@gmail.com', // Use your email
                subject: 'Password Reset OTP',
                text: `Your OTP for password reset is: ${otp}`
            };

            // Send the email with the OTP
            transporter.sendMail(mailOptions, function(err) {
                // Handle errors during email sending
                if (err) {
                    console.error('Erreur lors de l’envoi de l’email:', err);
                    return res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'email.');
                }
                // Respond with success message
                res.status(200).send('Un OTP a été envoyé à votre adresse e-mail. Merci de vérifier votre email.');
            });
        });
    });
};


exports.resetPasswordWithOTP = (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Encode l'OTP en Base64
    const encodedOTP = Buffer.from(otp).toString('base64');

    // Recherche de l'utilisateur en fonction de l'e-mail, de l'OTP et de la date d'expiration de l'OTP
    User.findOne({ email, otp: encodedOTP, otpExpires: { $gt: Date.now() } }, (err, user) => {
        if (err) {
            console.error('Erreur lors de la recherche de l\'utilisateur :', err);
            return res.status(500).send('Une erreur s\'est produite lors de la recherche de l\'utilisateur.');
        }
        console.log(err);
        if (!user) {
            console.log('Aucun utilisateur trouvé.');
            return res.status(400).send('OTP non valide ou expiré.');
        }
        console.log(!user);

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
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
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
};
