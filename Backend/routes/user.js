import express from "express";
const router = express.Router();
module.exports=router;
import {User} from "./../db";
import zod from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config";
import bcrypt from "bcrypt";

const saltrounds=10;

const signScehma=zod.object({
  username:zod.string(),
  firstname:zod.string(),
  lastname:zod.string(),
  password:zod.string()
})

const signInSchema=zod.object({
  username:zod().string(),
  password:zod().string(),
})


router.post("/signin",async (req,res)=>{
  const firstname=req.body.username;
  const lastname=req.body.lastname;
  const password=req.body.password;
  const ifUserExists=await User.findOne({firtname:firstname});

  if(ifUserExists){
    res.json(user);
  }
  else{
    res.render('/signup');
  }
})

router.post("/signup",async (req,res)=>{
  const body=req.body;
  const {success}=signScehma.safeParse(body);
  if(!success){
    return res.json({
      message:" Incorrect inputs"
    })
  }
  const user=await User.findOne({username:body.username});

  if(user._id){
    return res.json({
      message:"Email already taken"
    })
  }
  let password=body.password;

  bcrypt.hash(password,saltrounds,async (err,hash)=>{
    if(err){
      console.log({Error:err});
    }
    else{
      body.password=hash;
      const dbUser=await User.create(body);

      const token = jwt.sign({
        userId:dbUser._id
      },JWT_SECRET);
    
      res.json({
        message:"User created successfully",
        token:token
      })
    }
  })
  
  

})
