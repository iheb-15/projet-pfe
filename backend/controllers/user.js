// controllers/user.js

const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Add new user
exports.add = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    const { name, lastname, email, password, role } = req.body;
    const user = new User({ name, lastname, email, password, role });

    user.save((err, newUser) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            });
        }

      
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
