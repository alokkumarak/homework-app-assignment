const mongoose = require("mongoose")

const Genres=new mongoose.Schema(
    {
    genres:{
        type:String,
        required:true
    },  
},
{ timestamps: true }

)

mongoose.model("genre",Genres)
