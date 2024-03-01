<<<<<<< HEAD
const express=require("express")
const { add } = require("../controllers/user")
const { signin} = require("../controllers/user")
const { signout} = require("../controllers/user")
const {check} = require('express-validator')
const user = require("../models/user")
const router=express.Router()

const { resetPassword,requestPasswordReset } = require('../controllers/user');

router.post('/add',[
 check("name","le nom doit obtenir 3 caractére").isLength({min:3}),
 check("email","email doit valide").isEmail(),
 check("password","le mot de passe doit devient 6 caractére ").isLength({min:6}),
],add);
=======
// routes/user.js

const express = require("express");
const { add, signin, signout, updateUser, deleteUser } = require("../controllers/user");
const { check } = require('express-validator');
const router = express.Router();
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b

// Create User
router.post('/add', [
    // Validation checks for user creation
    check('name').isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères.'),
    check('lastname').optional().isLength({ max: 32 }).withMessage('Le nom de famille ne doit pas dépasser 32 caractères.'),
    check('email').isEmail().withMessage('Veuillez entrer une adresse email valide.'),
    check('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
    check('role').isNumeric().withMessage('Le rôle doit être un nombre entier.'),
], add);

<<<<<<< HEAD
router.post('/signin',signin);
router.get("/signout",signout);
=======
// Update User
router.put('/update/:userId', [
    // Validation checks for user update
    check('name').isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères.'),
    check('lastname').optional().isLength({ max: 32 }).withMessage('Le nom de famille ne doit pas dépasser 32 caractères.'),
    check('email').isEmail().withMessage('Veuillez entrer une adresse email valide.'),
    check('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
], updateUser);

// Delete User
router.delete('/delete/:userId', deleteUser);
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b

// Sign In User
router.post('/signin', signin);

<<<<<<< HEAD


router.post('/send-code', async (req, res) => {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000); // Génère un code à 6 chiffres
    try {
      await requestPasswordReset(email, code);
      console.log(`Code envoyé avec succès à l'email : ${email}`);
      res.status(200).json({ message: 'Code envoyé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail.' });
      console.log(`echec à l'email : ${email}`);
    }
  });
  
  // Route pour réinitialiser le mot de passe
  router.post('/resetPassword', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      await resetPassword(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la réinitialisation du mot de passe.' });
    }
  });
  


module.exports=router;
=======
// Sign Out User
router.get("/signout", signout);

module.exports = router;
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b
