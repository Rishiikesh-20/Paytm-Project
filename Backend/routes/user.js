import express from "express";
export const userRouter = express.Router();
import {User} from "./../db.js";
import {Account} from "./../db.js"
import zod from "zod";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import {JWT_SECRET} from "../config.js";
import bcrypt from "bcrypt";
import authMiddleware from "../middleware.js";
const saltrounds=10;
userRouter.use(express.json())
userRouter.use(bodyParser.urlencoded({extended:true}));

userRouter.post("/signin",async (req,res)=>{

  const signInSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
  })

  const body=req.body;
  const {success}=signInSchema.safeParse(body);
  if(!success){
    res.json({message:"Wrong Inputs"});
  }
  else{
    const user=await User.findOne({username:body.username});
    const isMatch=await bcrypt.compare(body.password,user.password);
    if(!user._id){
      res.json({
        message: "Error while logging in"
      });
    }
    else if(isMatch){
      const token = jwt.sign({userId:user._id},JWT_SECRET);
      res.json(
        {
          token:token
        }
      )
    }else{
      res.json({
        message:"Wrong password"
      })
    }
  }
})

userRouter.post("/signup",async (req,res)=>{
  //console.log({Request:req});
  const signScehma=zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
  })

  const body=req.body;
  const {success}=signScehma.safeParse(body);
  if(!success){
    return res.json({
      message:" Incorrect inputs",
      u:body
    })
  }
  const user=await User.findOne({username:body.username});

  if(user){
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

      await Account.create({
        userId:dbUser._id,
        balance:Math.random()*10000+1
      })

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

userRouter.put("/",authMiddleware,async (req,res)=>{
  const updateUser=zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional()
  })
  const body=req.body;
  const {success}=updateUser.safeParse(body);

  if(!success){
    res.status(411).json({message:"Wrong Inputs",u:body});
  }
  else{
    try{
      const user=await User.findOne({_id:req.userId});
      user.firstName=body.firstName || user.firstName;
      user.lastName=body.lastName || user.lastName;
      user.password=body.password || user.password;

      await User.updateOne({_id:req.userId},user);

      res.json({
        message: "Updated successfully",req:req.userId
      })
      
    }catch(e){
      console.log({error:e});
      res.json({message:"Error while updating information , Error"+e})
    }
  }
})

userRouter.get('/bulk',async (req,res)=>{
  const filter=req.query.filter || "";
  try{
    const users=await User.find({
      $or:[
        {firstName:{$regex:filter}},{lastName:{$regex:filter}}
      ]
    })
    res.json({
      user:users.map(user => [user._id,user.firstName,user.lastName])
    })
  }catch(e){
    console.log({Error:e});
    res.json({message:"Error while finding users"});
  } 
})


