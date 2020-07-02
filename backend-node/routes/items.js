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
            itemname: req.body.itemName,
            buying: req.body.buying,
            selling: req.body.selling,
            addedby:req.body.addedby,
            addedon:req.body.addedon,
            storequantity:req.body.storequantity,
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


/******************************************************Search All Items******************************************************************* */

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

/******************************************************Search All Suppliers******************************************************************* */

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

/******************************************************** Search Item *******************************************************/

router.get("/searchItem/:itemid", function (req, res, next) {
    const itemid = req.body.itemid;
    console.log(itemid);
    Items.findByUserid(itemid, function (err, item) {
        if (err) throw err;
        if (!item) {    //check the item available or not
            res.json({ state: false, msg: "No item found..!" });
            return;
        }
         Item.findOne({ itemid: itemid })    //find item using itemid
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

router.get("/getItems/:category", function (req, res, next) {

    const category = req.params.category;

    Items.find( { itemtype: category }, { itemid: 1} )
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

// /******************************************************** Add Items(Stock) to Store *******************************************************/


router.post("/addStock", function (req, res) {
    const itemid = req.body.itemId;
    //console.log(itemid)


    Items.updateOne({ itemid: itemid }, { $inc: { storequantity: req.body.quantity }})    
    Items.updateOne({ itemid: itemid }, { $set: { lastmodifiedby: req.body.lastmodifiedby, lastmodifiedon: req.body.lastmodifiedon }})  
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