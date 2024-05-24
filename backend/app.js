
const mongoose = require("mongoose"); 
const express = require("express"); 
const app = express(); 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 
const cors = require("cors"); 
require("dotenv").config(); 
const company2Routes = require('./routes/company2Routes');


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


const featureRoutes = require("./routes/featureRoutes");
app.use('/api/features', featureRoutes);

const companyRoutes = require('./routes/companyRoutes');
app.use('/api', companyRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
app.use(express.json());
app.use('/api/company2', company2Routes);

const candidateRoutes = require('./routes/candidateRoutes');
app.use('/api/candidates', candidateRoutes);

const question2Routes = require('./routes/question2Routes');
app.use('/api/question2', question2Routes);

const testRoutes = require('./routes/testRoutes');
app.use('/api/tests', testRoutes);

const candidateTestRoutes = require('./routes/candidateTestRoutes');
app.use('/api', candidateTestRoutes);

const candidateTest2Routes = require('./routes/candidateTest2Routes');
app.use('/api', candidateTest2Routes);


