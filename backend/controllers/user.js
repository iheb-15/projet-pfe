const User = require("../models/user")
const {validationResult, check} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
// 
exports.signup=(req,res)=>{
  const erros =validationResult(req)
  if(!erros.isEmpty()){
    return res.status(400).json({
        error: erros.array()[0].msg
    })

  }

        const user= new User(req.body)
        user.save((Err, user)=>{
       if(Err){
        return res.status(400).json({
            Error: "unable to add user"
           });
        }
        return res.json({
            message:"succes",
            user
        })
    
    })
}
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


exports.signout = (req, res) => {
    
    res.clearCookie("token");
    return res.json({
        message: "vous-êtes déconnecter"
    });
};

