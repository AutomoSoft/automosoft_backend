const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const multer = require('multer');
const bcrypt = require('bcryptjs');
var path = require('path');
const fs = require('fs');


/******************************************************** Available Technicians *******************************************************/

//view available technicians for a particular job category - Job Card
router.get("/getTechnicians/:category", function (req, res, next) {
    const expertise = req.params.category;
    
         User.find({ expertise: expertise })    
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    
});

//assign jobs - Job Card Comp

router.get("/addTechnicians/:id", function (req, res, next) {
    const userid = req.params.id;
    //console.log(userid);
    
         User.update({ userid: userid }, { $inc: { currentjobCap: 10 }})    
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    
});

//clear jobs - Job Card Comp

router.get("/remTechnicians/:id", function (req, res, next) {
    const userid = req.params.id;
    //console.log(userid);
    
         User.update({ userid: userid }, { $inc: { currentjobCap: -10 }})    
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    
});


















module.exports = router; 