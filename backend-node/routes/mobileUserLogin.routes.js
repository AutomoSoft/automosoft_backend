const express=require("express");
const router =express.Router();
const mobileUser=require("../controllers/mobileUserLogin.controllers");


router.post("/signUp",mobileUser.signUp);
router.post("/signIn",mobileUser.singIn);

module.exports=router;