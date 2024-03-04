
const mongoose = require("mongoose"); 
const crypto = require("crypto"); 
const uuidv1 = require("uuid/v1"); 
const { ObjectId } = mongoose.Schema; 
const bcrypt = require("bcryptjs"); 


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
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },

    
   
    salt:String,// sécurité mot pass
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    otp: String,
    otpExpires: Date
}, { collection: 'user' }
,{timestamps:true});





userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1(); 
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });


userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            // 
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};


userSchema.methods.remove = async function () {
    await this.remove();
};


module.exports = mongoose.model("User", userSchema);
