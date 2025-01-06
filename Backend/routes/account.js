import express from "express";
import authMiddleware from "../middleware.js";
import { Account, User } from "../db.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
export const accountRouter=express.Router();
accountRouter.use(express.json())
accountRouter.use(bodyParser.urlencoded({extended:true}));
accountRouter.get("/balance",authMiddleware,async (req,res)=>{
  const userId=req.userId;
  try{
    const account=await Account.findOne({userId:userId},{balance:true,_id:false})
    // console.log({
    //   userID:userId,
    //   account:account
    // })
    res.json(account);
  }catch(e){
    console.log(e);
    res.json({
      message:"Error while gettign details"
    })
  }
})

accountRouter.post("/transfer",authMiddleware,async (req,res)=>{
  const session=await mongoose.startSession();
  try{
    session.startTransaction();
    const from=req.userId;
    const {to,amount}=req.body;
    console.log({to:to,amount:amount})
    const fromAccount=await Account.findOne({userId:from}).session(session);

    if(fromAccount.balance-amount<0){
      throw new Error("Insufficient balance")
    }

    const toAccount=await User.findOne({username:to}).session(session);
    console.log(toAccount);
    if(!toAccount){
      throw new Error("Invalid account")
    }
    const toUserId=await Account.findOne({userId:toAccount._id},{userId:true,_id:false}).session(session);
    console.log(toUserId)
    await Account.updateOne({userId:from},{$inc:{balance:-amount}}).session(session);

    await Account.updateOne({userId:toUserId.userId},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();

    res.json({
      message:"Transaction Sucessfull"
    })

  }catch(e){
    console.log({Error:e})
    await session.abortTransaction();
    res.json({
      message:""+e
    })
  }finally{
    await session.endSession();
  } 
})