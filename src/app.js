const express = require("express");
const app=express();




app.get("/user",(req,res)=>{
  console.log(req.query);
  res.send("hello")
  
})

app.listen(3000,()=>{
  console.log("server listening to the request...");
  
})