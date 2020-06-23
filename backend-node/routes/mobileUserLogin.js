const express = require('express');
const router = express.Router();
const User = require('../models/users');


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

module.exports = router; 