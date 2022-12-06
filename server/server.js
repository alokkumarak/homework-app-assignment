require('dotenv').config();
const express=require('express')
const mongoDB=require('./db.js')
const bodyParser=require('body-parser')

const app=express()

mongoDB();
const PORT=process.env.PORT || 6000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

require("./models/MovieModel.js");
require("./models/UserModel.js");
require("./models/GenresModel.js");

app.use(express.json());
app.use(require("./routers/LogInSign"));
app.use(require("./routers/Movies"));
app.use(require("./routers/User"));



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})