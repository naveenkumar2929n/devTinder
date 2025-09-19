const jwt=require("jsonwebtoken")
const User=require("../models/user")
const userAuth=async(req,res,next)=>{
  try{
 const cookies=req.cookies;
 const{token}=cookies;
 if(!token){
  throw new Error("invalid token")
 }
 const decodedData=await jwt.verify(token,"DEV@TINDER")
 const{_id}=decodedData;
 const user=await User.findById(_id)
 if(!user){
  throw new Error("user doesnot exist")
 }
req.user=user
next()
}catch(err){
  res.status(400).send("error: "+err.message)
}
}


module.exports={userAuth}