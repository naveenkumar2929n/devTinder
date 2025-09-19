const validator=require("validator")

const validatesignup=(req)=>{
const{firstName,lastName,emailId,password}=req.body;

if(!firstName||!lastName){
  throw new Error("invalid name input")
}
else if(!validator.isEmail(emailId)){
  throw new Error("invalid emailId input")
}
else if(!validator.isStrongPassword(password)){
  throw new Error("weak password...👨‍💻")
}

}

module.exports={validatesignup}