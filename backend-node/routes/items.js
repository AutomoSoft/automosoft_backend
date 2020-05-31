const express = require('express');
const router = express.Router();
const Items = require('../models/items');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const multer = require('multer');
const bcrypt = require('bcryptjs');
var path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'local_storage/item_Images/')    //item images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)   //set the file neme
    }
});

const upload = multer({ storage: storage }).single('itemImage');


/******************************************************** Add new item *******************************************************/

router.post("/registerItem", function (req, res) {
    upload(req, res, (err) => {
        //console.log(req.file.filename)
        var fullPath = req.file.originalname;    

        var newItem = new Items({
            itemtype: req.body.itemtype,
            itemid: req.body.itemid,
            itemname: req.body.firstName,
            buying: req.body.buying,
            selling: req.body.selling,
            addedby:req.body.addedby,
            addedon:req.body.addedon,
            lastmodifiedby:req.body.lastmodifiedby,
            lastmodifiedon:req.body.lastmodifiedon,
            filepath: fullPath,
        });


        newItem.save()      //save the item data 
            .then(result => {
                console.log(result)
                res.json({ state: true, msg: "Data Inserted Successfully..!" });
            })
            .catch(error => {
                console.log(error)
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })        
    });
});






module.exports = router; 