const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');


/******************************************************** Add New Job *******************************************************/

router.post("/createInvoice", function (req, res) {
    console.log(req.body)

        var newInvoice = new Invoice({
            invoiceNo: req.body.invoiceNo,
            invoiceDate: req.body.invoiceDate,
            po: req.body.po,
            jobNo: req.body.jobNo,
            jobDate: req.body.jobDate,
            custId: req.body.custId,
            firstName: req.body.firstname,
            lastName: req.body.lastName,
            vehicleNo: req.body.vehicleNo,
            engineNo: req.body.engineNo,
            itemsUsed:req.body.itemsUsed,
            subTotal: req.body.subTotal,
            tax: req.body.tax,
            grandTotal: req.body.grandTotal,
            amountPaid: req.body.amountPaid,
            balance: req.body.balance,
            note: req.body.note,
            createdBy: req.body.createdBy,
                });
                console.log(newInvoice)
            newInvoice.save()      //save job data
                    .then(result => {
                        console.log(result)
                        res.json({ state: true, msg: "Inovice Created Successfully..!" });
                    })
                    .catch(error => {
                        console.log(error)
                        res.json({ state: false, msg: "Error Try again...!!!" });
                    })

                    
                });

module.exports = router; 
