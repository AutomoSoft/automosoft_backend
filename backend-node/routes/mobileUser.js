const express = require('express');
const router = express.Router();
const User = require('../models/users');

/*......................login...............................................*/
router.post("/login", function (req, res, next) {
    
    const userid = req.body.userid;
    const password = req.body.password;
    User.findByUserid(userid, function (err, user) {  
        
        if (err) throw err;
        if (!user) {    //user not found
            console.log("USER NOT FOUNd")
            res.json({ state: false, msg: "No user found..!" });   
            return;
        }
        User.passwordCheck(password, user.password, function (err, match) { 
            if (err) {
                throw err;
            }

            if (match) {    //if userid and password matched
                 if(user.usertype==="Customer" || user.usertype==='Foreman'){
                    console.log("Login Successful ");
                    // const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 86400 });
                     
                    res.json({
                        state: true,
                        // token: "JWT" + token,
                        // cookie: password,
                        user: { //send user data to client server
                        
                           
                            userid: user.userid,
                            firstname: user.firstname,
                            lastname:user.lastname,
                            email: user.email,
                            usertype: user.usertype,
                        }


                    });
                    
                    next();
                 }
                
            }
            else {
                res.json({
                    state: false,
                    msg: "Password Incorrect..!"
                });
            }
        
        });
    });
});
/*.........................customer details........................*/

router.get('/customer', function (req,res,next) {
    
    User.find({usertype:"Customer"},{_id:0,userid:1,firstname:1,lastname:1})
    .then(customers => {
        res.status(200).json(customers);
      })
  
      .catch(err => {
        res.status(400).json(err);
      });

});
/*...................vehicale details...............................*/
router.get('/vehicales/:custid',function(req,res,next){
    const custid=req.params.custid
    console.log(custid);
     User.findByUserid(custid,function(err,user){
         if(err) throw err;
         if(!user){
             console.log("Customer not found");
             res.json({
                 msg:"Customer not found"
             });
         }
        //  else{
        //      console.log('data transfer');
        //      res.json({
                    
        //              vehicles:user.vehicles,
                  
        //      });
        //      console.log(user.vehicles);
        //  }
        User.findOne({ userid: custid })    //find user using userid
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!")
            console.log(JSON.parse(data.vehicles));
            res.json({data:JSON.parse(data.vehicles)});
            

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessfull..!")
            res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
        })
     });
    
});
/******************************************************** Available Technicians *******************************************************/

router.get("/getTechnicians/:category", function (req, res, next) {
    const expertise = req.params.category;
    
         User.find({ expertise: expertise },{_id:0, userid:1,currentjobCap:1,capacity:1,state: true})    
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data });
                

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    
});
module.exports = router; 