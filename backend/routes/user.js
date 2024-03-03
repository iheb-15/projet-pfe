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


router.post('/signin',signin);
router.get("/signout",signout);




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
