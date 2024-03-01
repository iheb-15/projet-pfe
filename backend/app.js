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
    }
);

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes setup
const userRoutes = require("./routes/user");
app.use('/api', userRoutes);

// Server setup
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
