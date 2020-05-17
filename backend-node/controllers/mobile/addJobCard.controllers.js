const addJobCard=require('../../models/mobile/addJobCard.models');
const mongoose=require('mongoose');

exports.addJobCard=(req,res)=>{
    const newJobCard=new addJobCard({
            _id:new mongoose.Types.ObjectId(),
            jobNo:req.body.jobNo,
            serialNo:req.body.serialNo,
            date:req.body.date, 
            vehicalNo:req.body.vehicalNo,
            make:req.body.make,
            chassisNo:req.body.chassisNo,
            model:req.body.model,
            engineNo:req.body.engineNo,
            milage:req.body.milage,
            customerName:req.body.customerName,
            contactNo:req.body.contactNo,
            address:req.body.address,
            emailAddress:req.body.emailAddress,

    });
    newJobCard
    .save()
    .then(
        result=>{
            console.log(result);
            console.log('submit');
        }
    ).catch(
         err=>{
             console.log(err)
         }
    );
    res.status(200).json({
        message:"psot your data"
    });
}