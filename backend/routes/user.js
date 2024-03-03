
<<<<<<< HEAD

const authController = require('../controllers/user');
router.post('/add',[
 check("name","le nom doit obtenir 3 caractére").isLength({min:3}),
 check("email","email doit valide").isEmail(),
 check("password","le mot de passe doit devient 6 caractére ").isLength({min:6}),
],add);
=======
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
    check("name", "le nom doit obtenir 3 caractére").isLength({ min: 3 }), // Valider la saisie du nom
    check("email", "email doit valide").isEmail(), // Valider la saisie de l'e-mail
    check("password", "le mot de passe doit devient 6 caractére ").isLength({ min: 6 }), // Valider la saisie du mot de passe
], add); // Définir  route pour ajouter un nouvel utilisateur
>>>>>>> ff9b0c63ba32292af95a13e58c616c6ec8abf049

router.put(
    '/update/:userId',
    [
        check('name', 'Le nom doit avoir au moins 3 caractères.').isLength({ min: 3 }), 
        check('lastname', 'Le prenom doit avoir au moins 3 caractères.').isLength({ min: 3 }), 
        check('email', 'L\'email doit être valide.').isEmail(), 
        check('password', 'Le mot de passe doit avoir au moins 6 caractères.').isLength({ min: 6 }) 
    ],
    update
); // Définir route pour la mise à jour des informations utilisateur

// Nouvelle route pour supprimer un utilisateur, en utilisant la méthode delete du contrôleur authController
router.delete('/delete/:userId', authController.delete);

router.post('/signin', signin); 
router.get("/signout", signout); 

<<<<<<< HEAD
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password-with-otp', authController.resetPasswordWithOTP);




module.exports=router;
=======
router.post('/forgot-password', authController.forgotPassword); 
router.post('/reset-password-with-otp', authController.resetPasswordWithOTP); 

module.exports = router; 
>>>>>>> ff9b0c63ba32292af95a13e58c616c6ec8abf049
