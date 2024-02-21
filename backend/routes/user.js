const express=require("express")
const { signup } = require("../controllers/user")
const { signin} = require("../controllers/user")
const { signout} = require("../controllers/user")
const {check} = require('express-validator')
const router=express.Router()


router.post('/signup',[
 check("name","le nom doit obtenir 3 caractére").isLength({min:3}),
 check("email","email doit valide").isEmail(),
 check("password","le mot de passe doit devient 6 caractére ").isLength({min:6}),
],signup);


router.post('/signin',signin);

router.get("/signout",signout);


module.exports=router;