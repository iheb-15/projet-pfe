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
    }
    else{
        await console.log('erreur :'+err)
    }
}
)

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

const userRoutes=require("./routes/user")
//root
app.use('/api',userRoutes)

const port = process.env.PORT || 3001

//start server

app.listen(port, () => {
    console.log(`app is running at ${port}`)
})