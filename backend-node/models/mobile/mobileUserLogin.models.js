const mongoose= require('mongoose');

const mobileUserSchema=mongoose.Schema({
      _id:mongoose.Schema.Types.ObjectId,
      userName:{type:String,require:true},
      password:{type:String,require:true}

});

module.exports=mongoose.model("MobileUser",mobileUserSchema);