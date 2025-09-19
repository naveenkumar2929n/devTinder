const mongoose=require("mongoose");
const validator=require("validator")
const userSchema=mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String
  },
  emailId:{
    type:String,
    required:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid emailId input")
      }
    }
  },
  password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("weak password")
      }
    }
  },
  age:{
    type:Number
  },
  gender:{
    type:String,
    validate(gender){
      if(gender.includes(["male","female","other"])){
throw new Error("invalid gender input")
      }
    }
  }
},{
  timestamps:true
})


module.exports=mongoose.model("User",userSchema)