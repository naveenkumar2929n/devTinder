const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
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


userSchema.methods.getJWT=async function(){
  const user=this
const token=await jwt.sign({_id:user._id},"DEV@TINDER",{expiresIn:"7d"})
return token
}

module.exports=mongoose.model("User",userSchema)