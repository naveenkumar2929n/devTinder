const express = require("express");
const { userAuth } = require("./middlewares/user");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app=express();
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const bcrypt=require("bcrypt");
const { validatesignup } = require("./utils/validatesignup");
app.use(express.json())
app.use(cookieParser())

app.post("/signup",async(req,res)=>{
  try{
    validatesignup(req)
    const{firstName,lastName,emailId,password}=req.body;
    const passwordHash=await bcrypt.hash(password,10)
  const user=new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash
  })
  await user.save()
  res.send("user data saved...")
  }catch(err){
    res.status(400).send("error : "+err.message)
  }

})


app.post("/login",async(req,res)=>{
  try{
    const{emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("invalid credentials!.")
    }
    const isValidPassword=await bcrypt.compare(password,user.password);
    if(isValidPassword){
    const token = await user.getJWT()
    res.cookie("token",token);
    res.send("login successfull")
    }else{
       throw new Error("invalid credentials!.")
    }
   

  }catch(err){
    res.status(400).send("error :"+err.message)
  }
})


app.get("/user",userAuth,async(req,res)=>{
  try{
    const user=req.user;
    res.send(user)

  }catch(err){
    res.status(400).send("error :"+err.message)
  }
})

connectDB().then(()=>{
console.log("databse Connected...");
app.listen(3000,()=>{
  console.log("server listening to the request...");
})
}).catch((err)=>{
  console.log("error connecting to database"); 
})



