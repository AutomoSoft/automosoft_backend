const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Job = require('../models/jobs');
const Supplier = require('../models/supplier');
const Items = require('../models/items');



/**************************************************** Get Last Job Number  ************************************************************/

router.get("/getLastJobNo", function (req, res) {
    Job.find().sort( { _id: -1 }).limit(1)
    .select()
    .exec()
    .then(data => {
        console.log("Data Transfer Success..!");
        //console.log(data);
        res.json({ state: true, msg: "Data Transfer Success..!", data: data });

    })
    .catch(error => {
        console.log("Data Transfer Unsuccessful..!");
        res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
    })
});

/**************************************************** Get Last Customer Id  ************************************************************/

router.get("/getLastCusId", function (req, res) {
    User.find({ usertype: "Customer"}).sort( { _id: -1 }).limit(1)
    .select()
    .exec()
    .then(data => {
        console.log("Data Transfer Success..!");
        //console.log(data);
        res.json({ state: true, msg: "Data Transfer Success..!", data: data });

    })
    .catch(error => {
        console.log("Data Transfer Unsuccessful..!");
        res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
    })
});

/**************************************************** Get Last Employee Id  ************************************************************/

router.get("/getLastEmpId/:id", function (req, res) {
    const usertype = req.params.id;
    // console.log(req.params.id);

    if( usertype=="Technician" ){
        User.find({ usertype: "Technician"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    if( usertype=="Administrator" ){
        User.find({ usertype: "Administrator"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    if( usertype=="Foreman" ){
        User.find({ usertype: "Foreman"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    if( usertype=="Store-Keeper" ){
        User.find({ usertype: "Store-Keeper"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    if( usertype=="Accountant" ){
        User.find({ usertype: "Accountant"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    
});

/**************************************************** Get Last Supplier Id  ************************************************************/

router.get("/getLastSupId", function (req, res) {
    Supplier.find().sort( { _id: -1 }).limit(1)
    .select()
    .exec()
    .then(data => {
        console.log("Data Transfer Success..!");
        //console.log(data);
        res.json({ state: true, msg: "Data Transfer Success..!", data: data });

    })
    .catch(error => {
        console.log("Data Transfer Unsuccessful..!");
        res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
    })
});

/**************************************************** Get Last Item Id  ************************************************************/

router.get("/getLastItemId/:id", function (req, res) {
    const itemtype = req.params.id;
    // console.log(req.params.id);

    if( itemtype=="Paints" ){
        Items.find({ itemtype: "Paints"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    if( itemtype=="Tools" ){
        Items.find({ itemtype: "Tools"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    if( itemtype=="Spare Parts" ){
        Items.find({ itemtype: "Spare Parts"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    if( itemtype=="Tyres" ){
        Items.find({ itemtype: "Tyres"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    if( itemtype=="Electric Parts" ){
        Items.find({ itemtype: "Electric Parts"}).sort( { _id: -1 }).limit(1)
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
        })
    }
    
});



module.exports = router; 