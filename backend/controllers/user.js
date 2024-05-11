
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
const Buffer = require('buffer').Buffer;

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

    
    let userId = req.params.userId;
    userId = userId.replace(/^:/, ''); // Supprime un deux-points au début s'il existe

    const { name, lastname, email, password, role } = req.body;

    try {
        
        const user = await User.findById(userId);

        
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        
        if (req.method === 'add') {
            
            user.name = name;
            user.lastname = lastname;
            user.email = email;
            user.role = role;
            user.password=password;
        } else {
            
            user.name = name;
            user.lastname = lastname;
            user.email = email;
            user.role = role;
            
        }
        await user.save();
        res.json({ message: 'Utilisateur mis à jour avec succès.', user: { id: user._id, name: user.name, lastname: user.lastname, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

// Fonction de contrôleur pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    // Assurez-vous que l'ID est correctement formaté
    let userId = req.params.userId;
    userId = userId.replace(/^:/, ''); // Supprime un deux-points au début s'il existe

    try {
        console.log(`Tentative de suppression de l'utilisateur avec l'ID : ${userId}`);
        const user = await User.findById(userId);

        // Vérifier si l'utilisateur existe
        if (!user) {
            console.log('Utilisateur non trouvé avec cet ID');
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        // Supprimer l'utilisateur
        await User.deleteOne({ _id: userId });

        // Réponse de succès
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur Interne du Serveur' });
    }
};

// Fonction de contrôleur pour gérer la connexion de l'utilisateur
exports.signin = (req, res) => {
    // Extraire l'e-mail, le mot de passe et le rôle du corps de la requête
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

        // Récupérer le rôle de l'utilisateur depuis la base de données
        const userRole = user.role;

        // Générer un JSON Web Token (JWT) pour l'authentification
        const token = jwt.sign({ _id: user._id, role: userRole }, process.env.SECRET);

        // Définissez le token en tant que cookie dans la réponse
        res.cookie('token', token, { expires: new Date(Date.now() + 1) });

        // Extraire les détails pertinents de l'utilisateur
        const { _id, name, email } = user;

        // Répondez avec le jeton, le rôle de l'utilisateur et les détails de l'utilisateur
        return res.json({
            token,
            user: { _id, name, email },
            role: userRole
        });
    });
}
// Fonction de contrôleur pour gérer la déconnexion de l'utilisateur
exports.signout = (req, res) => {
    // Effacer le cookie de jeton d'authentification
    res.clearCookie("token");
    
    // Répondez avec un message de déconnexion
    return res.json({
        message: "Vous avez été déconnecté avec succès."
    });
};

exports.Name = (req, res) => {
    // Vérifiez si l'en-tête Authorization est présent
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter d'abord." });
    }

    // Récupérez le token d'authentification du header
    const token = authHeader.split(' ')[1];
    
    // Vérifiez et décodez le token
    jwt.verify(token, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide. Veuillez vous connecter à nouveau." });
        }
        
        // L'identifiant de l'utilisateur connecté
        const userId = decodedToken.userId;

        // Recherchez l'utilisateur dans la base de données en utilisant l'identifiant
        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Une erreur s'est produite lors de la recherche de l'utilisateur." });
            }
            if (!user) {
                return res.status(404).json({ message: "Utilisateur introuvable." });
            }
            // Renvoyer le nom de l'utilisateur dans la réponse
            return res.json({ name: user.name });
        });
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
        user.otpExpires = new Date(Date.now() + 6 * 60 * 1000); // OTP expires in 6 minutes
        console.log(otp);
       
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

    // Recherche de l'utilisateur en fonction de l'email
    User.findOne({ email }, function(err, user) {
        if (err) {
            console.error('Erreur lors de la recherche de l\'utilisateur :', err);
            return res.status(500).send('Une erreur s\'est produite lors de la recherche de l\'utilisateur.');
        }
        if (!user) {
            console.log('Aucun utilisateur trouvé.');
            return res.status(400).send('Aucun utilisateur trouvé.');
        }
        
        // Vérification de la date d'expiration de l'OTP
        if (user.otpExpires < Date.now()) {
            console.log('OTP expiré.');
            return res.status(400).send('OTP expiré.');
        }

        // Vérification de l'OTP
        if (user.otp !== otp) {
            console.log('OTP non valide.');
            return res.status(400).send('OTP non valide.');
        }

        // Mise à jour du mot de passe de l'utilisateur avec le nouveau mot de passe
        user.password = newPassword;

        // Supprimer l'OTP et la date d'expiration de l'OTP après la réinitialisation du mot de passe
        user.otp = undefined;
        user.otpExpires = undefined;

        // Sauvegarde des modifications de l'utilisateur
        user.save((err) => {
            if (err) {
                console.error('Erreur lors de la sauvegarde des données utilisateur :', err);
                return res.status(500).send('Une erreur s\'est produite lors de la sauvegarde des données utilisateur.');
            }

            // Création du jeton d'authentification
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '6m' }); // La durée d'expiration est maintenant de 6 minutes

            // Enregistrement du jeton dans les cookies
            res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 6 * 60 * 1000) }); // 6 minutes d'expiration

            const { _id, name, email } = user;
            return res.json({
                message: "Mot de passe réinitialisé avec succès",
                token,
                user: { _id, name, email }
            });
        });
    });
};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();// pour générer code entre 0 et 899999 avec l'ajout de 100000 pour le code
};
