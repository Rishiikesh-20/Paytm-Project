
import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://rishiikeshsk:27SSw48YUUYdaRr6@cluster0.fkz5n.mongodb.net/Paytm")

const schema=new mongoose.Schema({
  username:{type:String,required:true,unique:true,trim:true,lowercase:true,minlength:3,maxlength:30},
  firstName:{type:String,required:true,minlength:6},
  lastName:{type:String,required:true,trim:true,maxlength:50},
  password:{type:String,required:true,trim:true,maxlength:50}
})

const User=mongoose.model("user",schema);

module.exports={
  User
}






