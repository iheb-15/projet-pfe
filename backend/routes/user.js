const express=require("express")
const { add } = require("../controllers/user")
const { signin} = require("../controllers/user")
const { signout} = require("../controllers/user")
const {check} = require('express-validator')
const user = require("../models/user")
const router=express.Router()


const authController = require('../controllers/user');
router.post('/add',[
 check("name","le nom doit obtenir 3 caractére").isLength({min:3}),
 check("email","email doit valide").isEmail(),
 check("password","le mot de passe doit devient 6 caractére ").isLength({min:6}),
],add);


router.post('/signin',signin);
router.get("/signout",signout);


router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password-with-otp', authController.resetPasswordWithOTP);




module.exports=router;