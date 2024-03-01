// routes/user.js

const express = require("express");
const { add, signin, signout, updateUser, deleteUser } = require("../controllers/user");
const { check } = require('express-validator');
const router = express.Router();

// Create User
router.post('/add', [
    // Validation checks for user creation
    check('name').isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères.'),
    check('lastname').optional().isLength({ max: 32 }).withMessage('Le nom de famille ne doit pas dépasser 32 caractères.'),
    check('email').isEmail().withMessage('Veuillez entrer une adresse email valide.'),
    check('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
    check('role').isNumeric().withMessage('Le rôle doit être un nombre entier.'),
], add);

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

// Sign In User
router.post('/signin', signin);

// Sign Out User
router.get("/signout", signout);

module.exports = router;
