const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');




//supplier registration

router.post("/registerSupplier", function (req, res) {

        var newSupplier = new Supplier({
            usertype: req.body.usertype,
            supname: req.body.supname,
            supid: req.body.supid,
            address: req.body.address,
            contactnumber: req.body.contactnumber,
            itemtype: req.body.itemtype,
            itemid: req.body.itemid,
            brand: req.body.brand,
            note: req.body.note,
            addedby:req.body.addedby,
            addedon:req.body.addedon,
            // filepath: fullPath,
        });
        
        newSupplier.save()      //save supplier data
            .then(result => {
                console.log(result)
                res.json({ state: true, msg: "Data Inserted Successfully..!" });
            })
            .catch(error => {
                console.log(error)
                res.json({ state: false, msg: "Error Try again...!!!" });
            })

             
        });















module.exports = router; 