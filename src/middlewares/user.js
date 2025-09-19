
const userAuth=(req,res,next)=>{
  try{
  const token="xysz";
  const isTokenValid=token==="xyz";
  if(!isTokenValid){
    throw new Error("invalid token")
  }else{
    next()
  }
}catch(err){
  res.status(400).send("error: "+err.message)
}
}


module.exports={userAuth}