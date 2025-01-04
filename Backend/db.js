
import mongoose from "mongoose";
import { object } from "zod";

await mongoose.connect("mongodb+srv://rishiikeshsk:27SSw48YUUYdaRr6@cluster0.fkz5n.mongodb.net/Paytm")

const schema=new mongoose.Schema({
  username:{type:String,required:true,unique:true,trim:true,lowercase:true,minlength:3,maxlength:30},
  firstName:{type:String,required:true,minlength:6},
  lastName:{type:String,required:true,trim:true,maxlength:50},
  password:{type:String,required:true,trim:true}
})

export const User= mongoose.model("user",schema);

const accountSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required: true},
  balance:{type:Number,required: true}
});

export const Account= mongoose.model("account",accountSchema);










