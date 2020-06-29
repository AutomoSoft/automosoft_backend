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


/******************************************************Search All Suppliers******************************************************************* */

router.get("/searchAllItems", function (req, res, next) {
    
    Items.find( {}, { itemtype: 1, itemid: 1, buying: 1, selling: 1, addedby: 1, addedon: 1} )
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

/******************************************************Search All Items******************************************************************* */

router.get("/searchAllSuppliers", function (req, res, next) {
    
    Supplier.find( {}, { supid: 1, usertype: 1, supname: 1, items: 1, contactnumber: 1, addedon: 1 } )
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





module.exports = router; 