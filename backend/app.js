
const mongoose = require("mongoose"); 
const express = require("express"); 
const app = express(); 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 
const cors = require("cors"); 
require("dotenv").config(); 


// Connect to the MongoDB database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, async (err) => {
    if (!err) {
        console.log("DB:" + process.env.DATABASE);
        await console.log('Connection to the database successful.');
    } else {
        await console.log('Error connecting to the database:', err);
    }
});

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.body); // Cela affichera le corps de la requête dans la console
    next();
  });


const userRoutes=require("./routes/user")
app.use('/api',userRoutes)

const questionRoutes =require("./routes/questionRoutes")
app.use('/api',questionRoutes);
// const recinovQuestionRoutes = require('./routes/questionRoutes');
// app.use('/api/recinovquestions', recinovQuestionRoutes);

// const languageRoutes  = require('./routes/questionRoutes');
// app.use('/api/languages', languageRoutes);

// const recinovAnswerRoutes = require('./routes/questionRoutes');
// app.use('/', recinovAnswerRoutes);


const featureRoutes = require("./routes/featureRoutes");
app.use('/api/features', featureRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
