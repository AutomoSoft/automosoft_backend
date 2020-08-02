const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const purchaseOrders = require('../models/purchase-orders');
const purchaseOrderRequests = require('../models/purchase-order-requests');
const items = require('../models/items');

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

router.post("/sendEmail", function (req, res) {

  const generateEmailText = (supplierName, itemName, itemId, itemType, quantity) => {
    return `
      Dear ${suppliername},\n
      \n
      Kindly note that we wish to place an order for the following item.

        * Item ID: ${itemId}
        * Item Name: ${itemName}
        * Item Type: ${itemType}
        * Item Quantity: ${quantity}
      
      Kindly also find the enclosed terms and conditions for the order for your reference. \n
      Kindly make arrangements for these goods to be delivered to our office address. Please \n
      contact us on 0777777777 if there is any other information needed or you have questions.\n
      Please treat this order with urgency and deliver the goods at your earliest.

      It is a pleasure to do business with an esteemed company such as yours and we hope to \n
      continue working together in the future.

      Thank you in advance.

      Your Faithfully,
      Accountant,
      Automosoft (PVT)LTD.
    `;
  };

  const sendEmail = (emailSubject, supplieremail, emailText) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'bzzthegroup@gmail.com',
          pass: '#bzz#team@123!',
      },
      tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
      },
    });

    const mailOptions = {
      from: 'bzzthegroup@gmail.com',
      to: supplieremail,
      subject: emailSubject,
      text: emailText
    }

    transporter.sendMail(mailOptions, function(err, data){
      if (err) {
          console.log('Error occurs!!!!', err);
      }
      else {
          console.log('email sent!!!');
      }
  });
  };

  const {
    purchaseOrderID,
    itemid,
    quantity,
    supplierid,
    suppliername,
    supplieremail
  } = req.body;

  items.findOne({ _id: itemid }).select().exec().then(item => {

    const newPurchaseOrderRequest = purchaseOrderRequests(
      {
        purchaseOrderID,
        itemId: itemid,
        itemName: item.itemname,
        itemType: item.itemtype,
        quantity,
        supplierId: supplierid,
        supplierEmail: supplieremail,
        supplierName: supplieremail,
        emailSubject: `Purchase Order Request ${ item.itemname }(${itemid})`,
        emailText: generateEmailText(suppliername, item.itemname, item.itemid, item.itemtype, quantity)
      }
    );
    

    purchaseOrders.updateOne({ _id: purchaseOrderID },
      { supplierid: supplierid }).select().exec().then(data => {
        newPurchaseOrderRequest.save().then(res => {
          sendEmail(emailSubject, supplieremail, emailText);
        }).catch(error => {

        });
      }).catch(error => {

      });
  }).catch(error => {

  });

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
