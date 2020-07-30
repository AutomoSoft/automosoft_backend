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

/******************************************************** Get Pending Orders *******************************************************/
router.get("/fetchOrdersByStatus", function (req, res) {
  const statusArray = req.query.status ? [req.query.status]: [0, 1]; 
    purchaseOrders.find( { status: { $in: statusArray } })
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

/******************************************************** Approve Orders *******************************************************/  
router.put("/approveOrder", function (req, res) {
  const id = req.body.id;
  purchaseOrders.updateOne({ _id: id }, { status: 1 }, { new: true })
    .select()
    .exec()
    .then(data => {
      console.log("Data Transfer Success..!");
      res.json({ state: true, msg: "Data Transfer Success..!", data: data });
    })
    .catch(error => {
      console.log("Data Transfer Unsuccessful..!");
      res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
    })
});
module.exports = router; 
