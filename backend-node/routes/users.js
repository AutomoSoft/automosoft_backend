const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const multer = require('multer');
const bcrypt = require('bcryptjs');
// var path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'local_storage/profile_Images/')    //profile pictures of users
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)   //set the file neme
    }
});

const upload = multer({ storage: storage }).single('profileImage');

//user login

router.post("/login", function (req, res, next) {
    
    const userid = req.body.userid;
    const password = req.body.password;
    User.findByUserid(userid, function (err, user) {    //user first find by userid
        
        if (err) throw err;
        if (!user) {    //user not found
            res.json({ state: false, msg: "No user found..!" });   
            return;
        }
        User.passwordCheck(password, user.password, function (err, match) { 
            if (err) {
                throw err;
            }

            if (match) {    //if userid and password matched
                console.log("Login Successful");
                // const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 86400 });

                res.json({
                    state: true,
                    // token: "JWT" + token,
                    // cookie: password,
                    user: { //send user data to client server
                        id: user._id,
                        name: user.name,
                        userid: user.userid,
                        email: user.email,
                        usertype: user.usertype,
                    }
                });
                next();
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


//user registration
router.post("/register", function (req, res) {
    upload(req, res, (err) => {
        // console.log(req.file.filename)
        //var fullPath = req.file.originalname;    //get userprofile image original name as the fullpath

        var newUser = new User({
            usertype: req.body.usertype,
            userid: req.body.userid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            contactnumber: req.body.contactnumber,
            gender: req.body.gender,
            nicnumber: req.body.nicnumber,
            address: req.body.address,
            vehiclenumber: req.body.vehicleRegNo,
            // filepath: fullPath,
        });

        bcrypt.genSalt(10, function (err, salt) {   //generate password salt
            bcrypt.hash(newUser.password, salt, function (err, hash) {  //hash the password 
                newUser.password = hash;

                if (err) {
                    throw err;
                }
                else {
                    newUser.save()      //save the userdata 
                        .then(result => {
                            console.log(result)
                            res.json({ state: true, msg: "Data Inserted Successfully..!" });
                        })
                        .catch(error => {
                            console.log(error)
                            res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
                        })
                }
            });
        });
    });
});


module.exports = router; 