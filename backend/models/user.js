<<<<<<< HEAD
const mongoose =require("mongoose")
const crypto =require("crypto");    
const uuidv1= require("uuid/v1");
const { ObjectId } = mongoose.Schema;
const bcrypt=require("bcryptjs");
=======
// models/user.js
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b

const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
<<<<<<< HEAD
    role:{
        type:String,
        default:'user'
       
=======
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b
    },
    role: {
        type: Number,
        trim: true
    },
<<<<<<< HEAD
    
   
    salt:String,// sécurité mot pass
    passwordResetToken: String,
    passwordResetExpires: Date
},{timestamps:true});
=======
    encry_password: {
        type: String,
        required: true
    },
    salt: String // security for password
}, { timestamps: true });
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.virtual("password")
    .set(function (password) {
        // Set virtual field for password and create unique salt
        this._password = password;
        this.salt = uuidv1(); // create unique id
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainpassword) {
        // Validate user password during authentication
        return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword: function (plainpassword) {
        // Encrypt password using unique salt
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

<<<<<<< HEAD

module.exports=mongoose.model("User",userSchema);
=======
module.exports = mongoose.model("User", userSchema);
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b
