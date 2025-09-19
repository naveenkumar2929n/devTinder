const express = require("express");
const { userAuth } = require("./middlewares/user");
const app=express();




app.get("/user",userAuth,(req,res)=>{
  try{
    res.send("data send")

  }catch(err){
    res.status(400).send("error: "+err.message)
  }
})

app.listen(3000,()=>{
  console.log("server listening to the request...");
  
})