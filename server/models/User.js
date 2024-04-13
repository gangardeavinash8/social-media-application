const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String, //it muset be string
    required: true, //email must require for login
    unique: true, //not allowed same email again and again
    lowercase: true, // item save as a lowercase
  },
  password:{
    type:String, //it muset be string
    required:true, //password must require for login
    select:false 

  }
});

module.exports=mongoose.model("user",userSchema)