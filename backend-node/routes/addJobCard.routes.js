const exprees=require("express");
const router=exprees.Router();
const addJobCard=require('../controllers/addJobCard.controllers');

router.post("/",addJobCard.addJobCard);

module.exports=router;