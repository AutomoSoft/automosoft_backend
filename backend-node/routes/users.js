const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const multer = require('multer');
const bcrypt = require('bcryptjs');
var path = require('path');
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

/******************************************************** User Login *******************************************************/

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

/******************************************************** User Registration *******************************************************/

router.post("/register", function (req, res) {
    upload(req, res, (err) => {
        //console.log(req.file.filename)
        var fullPath = req.file.originalname;    //get userprofile image original name as the fullpath

        var newUser = new User({
            usertype: req.body.usertype,
            userid: req.body.userid,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            contactnumber: req.body.contactnumber,
            gender: req.body.gender,
            nicnumber: req.body.nicnumber,
            address: req.body.address,
            expertise: req.body.expertise,
            capacity: req.body.capacity,
            currentjobCap: req.body.currentjobCap,
            addedby:req.body.addedby,
            addedon:req.body.addedon,
            lastmodifiedby:req.body.lastmodifiedby,
            lastmodifiedon:req.body.lastmodifiedon,
            vehicles: JSON.parse(req.body.vehicles),
            filepath: fullPath,
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

/******************************************************** Search User *******************************************************/

router.get("/searchUsers/:userid", function (req, res, next) {
    const userid = req.params.userid;
    User.findByUserid(userid, function (err, user) {
        if (err) throw err;
        if (!user) {    //check the user available or not
            res.json({ state: false, msg: "No user found..!" });
            return;
        }
         User.findOne({ userid: userid })    //find user using userid
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                //console.log(JSON.parse(data.vehicles));
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    })
});

//get user profile images
router.get("/profileImage/:filename", function (req, res) {
    const filename = req.params.filename;
    //console.log(filename)
    res.sendFile(path.join(__dirname, '../local_storage/profile_Images/' + filename));
});


/******************************************************** Update User *******************************************************/

router.post("/updateUser/:userid", function (req, res) {
    const userid = req.params.userid;
    // console.log(req.body)
    // console.log(userid)
    const input = {
            usertype: req.body.usertype,
            userid: req.body.userid,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
           // password: req.body.password,
            contactnumber: req.body.contactnumber,
            gender: req.body.gender,
            nicnumber: req.body.nicnumber,
            address: req.body.address,
            lastmodifiedby:req.body.lastmodifiedby,
            lastmodifiedon:req.body.lastmodifiedon,
    }
    
    User.updateOne({ userid: userid }, { $set: input })    //update user data with of the userid passed
        .exec()
        .then(data => {
            console.log("Data Updated Successfully!")
            res.json({ state: true, msg: "Data Updated Successfully!" });

        })
        .catch(error => {
            console.log("Failed to Update Data!!!")
            res.json({ state: false, msg: "Failed to Update Data!!!" });
        })
});


/******************************************************** Delete User *******************************************************/


//delete userdata 
router.delete("/deleteUser/:userid", function (req, res, next) {
    const userid = req.params.userid;
    User.findOneAndRemove({ userid: userid })       //find userid and delete user
        .exec()
        .then(data => {
            console.log("Successfully removed User Data..!")
            res.json({ state: true, msg: "Successfully removed User Data..!" });

        })
        .catch(error => {
            console.log("Failed to remove User Data")
            res.json({ state: false, msg: "Failed to remove User Data" });
        })
})

//delete user profile image 
router.delete("/delprofImage/:filename", function (req, res) {
    const filename = req.params.filename;
    console.log(filename)
    const path = 'local_storage/profile_Images/' + filename;
    try {
        fs.unlinkSync(path)
        res.status(200).json({  
            message: 'Sucessfully removed User Image...!'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: error
        });
    }
});

/******************************************************** Search All Users *******************************************************/


router.get("/searchAllUsers", function (req, res, next) {
    
    User.find( {}, { userid: 1, usertype: 1, firstname: 1, email: 1, contactnumber: 1, filepath: 1 } )
        .select()
        .exec() 
        .then(data => {
            console.log("Data Transfer Success..!")
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });
        
            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Transfer Unsuccessfull..!" });
            })
});

//get user profile images
router.get("/profileImage/:filename", function (req, res) {
    const filename = req.params.filename;
    //console.log(filename)
    res.sendFile(path.join(__dirname, '../local_storage/profile_Images/' + filename));
});

/******************************************************** Customer Vehicles *******************************************************/

router.get("/getVehicles/:userid", function (req, res, next) {
    const userid = req.params.userid;
    User.findByUserid(userid, function (err, user) {
        if (err) throw err;
        if (!user) {    //check the user available or not
            res.json({ state: false, msg: "No user found..!" });
            return;
        }
         User.findOne({ userid: userid })    //find user using userid
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                //console.log(JSON.parse(data.vehicles));
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    })
});

/******************************************************** Customer Add New Vehicle *******************************************************/

router.post("/addnewVehicle/:userid", function (req, res) {
    const userid = req.params.userid;
    
    const vehicles = req.body.vehicles;
    // console.log(req.body)
    // console.log(userid) 
    const input = {
            lastmodifiedby:req.body.lastmodifiedby,
            lastmodifiedon:req.body.lastmodifiedon,
    }

    //console.log(input);

    User.updateOne({ userid: userid  }, { $push: {vehicles: req.body.vehicles} },{ $set: input })  

        .exec()
        .then(data => {
            console.log("Data Updated Successfully!")
            res.json({ state: true, msg: "Data Updated Successfully!" });

        })
        .catch(error => {
            console.log("Failed to Update Data!!!")
            res.json({ state: false, msg: "Failed to Update Data!!!" });
        })
});



module.exports = router; 