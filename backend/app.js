<<<<<<< HEAD
const mongose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");// bch n3ml analuse lil http
const cookieParser=require("cookie-parser");
const cors=require("cors");
require("dotenv").config();


// cnx bd 
mongose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
},async(err)=>{
    if(!err){
        console.log("DB:" + process.env.DATABASE )
        await console.log('succes')
=======
// app.js

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Connect to the database
mongoose.set('strictQuery', false);

mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    async (err) => {
        if (!err) {
            console.log("DB:" + process.env.DATABASE);
            console.log("success");
        } else {
            console.log("error :" + err);
        }
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b
    }
);

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

<<<<<<< HEAD
const userRoutes=require("./routes/user")
//root
app.use('/api',userRoutes)

const port = process.env.PORT || 3001

//start server
=======
// Routes setup
const userRoutes = require("./routes/user");
app.use('/api', userRoutes);
>>>>>>> d04f3bda5457ee921b54420688c292dee6718a8b

// Server setup
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
