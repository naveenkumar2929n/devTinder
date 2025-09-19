const mongoose =require("mongoose");
const connectDB=async()=>{
  await mongoose.connect("mongodb+srv://naveenjanaki2929:d3oTtkxaxCHtHerk@cluster1.aawzqfh.mongodb.net/devTinder")
}


module.exports={connectDB}