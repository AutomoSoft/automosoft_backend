const MobileUser=require('../models/mobileUserLogin.models');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const jwt =require("jsonwebtoken");

exports.signUp=(req,res)=>{
    const newUser=new MobileUser({
        _id:new mongoose.Types.ObjectId(),
        userName:req.body.userName,
        password:bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                });
            }
            else{
                const newUser=new MobileUser({
                    _id:new mongoose.Types.ObjectId(),
                    userName:req.body.userName,
                    password:hash,
                });
                newUser
                .save()
                .then(result =>{
                    res.status(201).json({
                        messsage:"User created"
                    })
                })
                .catch(
                    err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    }
                );
            }
        })
    });
}
exports.singIn=(req,res)=>{
 const userName=req.body.userName;

 const password=req.body.password;
 MobileUser.findOne({userName:userName})
   .then(user=>{
       bcrypt
         .compare(password,user.password)
         .then(isMatch=>{
             if(isMatch){
               const token=  jwt.sign({
                     userName:user.userName,
                     userId:user._id
                 },"secret",{
                    expiresIn:"1h"
                });
                 return res.status(200).json({
                     
                     messsage:"login successful",
                     token:token
                   
                 });
             }
             else{
                 return res.status(400).json({incorrect:"Incorrect Username and password"});
             }
         })
         .catch(
             err=>{
                 console.log("err found !!!!"+err);
             }
         );
   })

}
