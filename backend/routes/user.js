

const express = require("express"); 
const { add } = require("../controllers/user"); 
const { update } = require("../controllers/user"); 
const { signin } = require("../controllers/user"); 
const { signout } = require("../controllers/user"); 
const { check } = require('express-validator'); 
const user = require("../models/user"); 
const router = express.Router(); 
const authController = require('../controllers/user'); 



router.post('/add', [
    check("name", "le nom doit obtenir 3 caractére").isLength({ min: 3 }),
    check("lastname", "le prénom doit obtenir 3 caractére").isLength({ min: 3 }), // Valider la saisie du nom
    check("email", "email doit valide").isEmail(), // Valider la saisie de l'e-mail
    check("role", "vous voulez choisir ta rôle "), // Valider la saisie du mot de passe
], add); // Définir  route pour ajouter un nouvel utilisateur
router.put(
    '/update/:userId',
    [
        check("name", "le nom doit obtenir 3 caractére").isLength({ min: 3 }),
        check("lastname", "le prénom doit obtenir 3 caractére").isLength({ min: 3 }), // Valider la saisie du nom
        check("email", "email doit valide").isEmail(), // Valider la saisie de l'e-mail
        check("role", "vous voulez choisir ta rôle "), // Valider la saisie du mot de passe
    ],
    update
); // Définir route pour la mise à jour des informations utilisateur

// Nouvelle route pour supprimer un utilisateur, en utilisant la méthode delete du contrôleur authController
router.delete('/delete/:userId', authController.delete);

router.post('/signin', signin); 
router.get("/signout", signout); 


router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password-with-otp', authController.resetPasswordWithOTP);




module.exports=router;
 

