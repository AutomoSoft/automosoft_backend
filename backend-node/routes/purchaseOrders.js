const express = require('express');
const router = express.Router();
const purchaseOrders = require('../models/purchase-orders');


/******************************************************** Request quantity *******************************************************/

router.post("/requestQuantity", function (req, res) {
    console.log(req.body)
    var newpurchaseOrders = new purchaseOrders({
        dateApplied:new Date(),
        itemid: req.body.itemid,
        quantity: req.body.quantity,
        supplierid:null,
        dateReceived:null,
        lastmodifiedby: req.body.userid,
        lastmodifiedon: new Date(),
        status:0,
    });
   
    newpurchaseOrders.save()     
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
