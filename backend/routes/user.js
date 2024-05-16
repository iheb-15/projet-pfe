

const express = require("express"); 
const { add } = require("../controllers/user"); 
const { update } = require("../controllers/user"); 
const { signin } = require("../controllers/user"); 
const { signout } = require("../controllers/user"); 
const { check } = require('express-validator'); 
const User = require("../models/user"); 
const router = express.Router(); 
const authController = require('../controllers/user'); 
const {deleteUser} =require("../controllers/user");
const { Name } = require("../controllers/user"); 
const{getArchivedUsers}=require("../controllers/user")




router.post('/add', [
    check("name", "le nom doit obtenir 3 caractére").isLength({ min: 3 }),
    check("lastname", "le prénom doit obtenir 3 caractére").isLength({ min: 3 }), // Valider la saisie du nom
    check("email", "email doit valide").isEmail(), // Valider la saisie de l'e-mail
    check("role", "vous voulez choisir ta rôle "), // Valider la saisie du mot de passe
], add); // Définir  route pour ajouter un nouvel utilisateur


router.put('/update/:userId', [ // Correction du chemin avec paramètre dynamique
    check("name", "Le nom doit contenir au moins 3 caractères").isLength({ min: 3 }),
    check("lastname", "Le prénom doit contenir au moins 3 caractères").isLength({ min: 3 }),
    check("email", "L'email doit être valide").isEmail(),
    check("password", "Le mot de passe est requis").exists(), // Ajouté pour exemple, ajustez selon le besoin
    check("role", "Le rôle est requis et doit être un nombre").isNumeric(), // Exemple de validation pour role
], update);

router.delete('/delete/:userId', deleteUser);


router.post('/singup',authController.singnup);
router.post('/signin', signin); 
router.get("/signout", signout); 

router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password-with-otp', authController.resetPasswordWithOTP);


router.get('/affichage', async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      console.error("Failed to fetch users", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  router.get('/name', authController.Name);

  router.get('/archived', getArchivedUsers);
  
  router.put('/unarchive/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      
      // Recherchez l'utilisateur dans la base de données
      const user = await User.findById(userId);
  
      // Vérifiez si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
  
      // Mettez à jour le champ isArchived de l'utilisateur
      user.isArchived = false;
      await user.save();
  
      // Réponse de succès
      res.json({ message: 'Utilisateur désarchivé avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur Interne du Serveur' });
    }
  });

module.exports=router;
 

