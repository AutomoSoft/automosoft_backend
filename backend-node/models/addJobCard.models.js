const mongoose =require("mongoose");

const addJobCardSchema=mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        jobNo:{type:String,require:true},
        serialNo:{type:String,require:true},
        date:{type:String,require:true}, 
        vehicalNo:{type:String,require:true},
        make:{type:String,require:true},
        chassisNo:{type:String,require:true},
        model:{type:String,require:true},
        engineNo:{type:String,require:true},
        milage:{type:String,require:true},
        customerName:{type:String,require:true},
        contactNo:{type:String,require:true},
        address:{type:String,require:true},
        emailAddress:{type:String,require:true},


});

module.exports=mongoose.model("addJobCard",addJobCardSchema);