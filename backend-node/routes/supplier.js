const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');




//supplier registration

router.post("/registerSupplier", function (req, res) {
    //console.log(req.body)
        var newSupplier = new Supplier({
            usertype: req.body.usertype,
            supname: req.body.supname,
            supid: req.body.supid,
            address: req.body.address,
            email: req.body.email,
            contactnumber: req.body.contactnumber,
            items: req.body.item,
            note: req.body.note,
            addedby:req.body.addedby,
            addedon:req.body.addedon,
            lastmodifiedby:req.body.lastmodifiedby,
            lastmodifiedon:req.body.lastmodifiedon,
            // filepath: fullPath,
        });
       // console.log(newSupplier)
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

/******************************************************** Search Supplier by id *******************************************************/

router.get("/searchSuppliers/:supid", function (req, res, next) {
    const supid = req.params.supid;
    Supplier.findBySupplierid(supid, function (err, supplier) {
        if (err) throw err;
        if (!supplier) {    //check the user available or not
            res.json({ state: false, msg: "No user found..!" });
            return;
        }
         Supplier.findOne({ supid: supid })    //find user using userid
            .select() 
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                //console.log(data);
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
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

/****************************************************Update Supplier***************************************************************/

router.post("/updateSupplier/:supid", function (req, res) {
    const supid = req.params.supid;
    console.log(req.body)
    const input = {
        usertype: req.body.usertype,
        supname: req.body.supname,
        supid: req.body.supid,
        address: req.body.address,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        //items: req.body.item,
        note: req.body.note,
        addedby:req.body.addedby,
        addedon:req.body.addedon,
        lastmodifiedby:req.body.lastmodifiedby,
        lastmodifiedon:req.body.lastmodifiedon,
    }
    Supplier.update({ supid: supid }, { $set: input })    //update Supplier data with of the supid passed
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

/******************************************************** Delete Supplier *******************************************************/


//delete Supplierdata 
router.delete("/deleteSupplier/:supid", function (req, res, next) {
    const supid = req.params.supid;
    Supplier.findOneAndRemove({ supid: supid })       //find supid and delete user
        .exec()
        .then(data => {
            console.log("Successfully removed Supplier Data..!")
            res.json({ state: true, msg: "Successfully removed Supplier Data..!" });

        })
        .catch(error => {
            console.log("Failed to remove Supplier Data")
            res.json({ state: false, msg: "Failed to remove Supplier Data" });
        })
})

















module.exports = router; 