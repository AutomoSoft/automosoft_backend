const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const pdfDoc = require("pdf-lib");
const fs = require("fs");


/******************************************************** New Invoice *******************************************************/

router.post("/createInvoice", async function (req, res) {

    console.log(req.body)
    const x = `./local_storage/invoices/${req.body.invoiceNo}.pdf`;         //pdf generated here


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
                // console.log(newInvoice)

        newInvoice.filePath = x;       
        // console.log(newInvoice.filePath);

        const uint8Array = fs.readFileSync(__dirname + "/invoice_template/Invoice.pdf");
        var doc = await pdfDoc.PDFDocument.load(uint8Array);
        const pages = doc.getPages();
        const page = pages[0];


        page.drawText(newInvoice.invoiceNo, {
            x: 200,
            y: 615,
            size: 12
          });

        const pdfBytes = await doc.save();

        fs.writeFileSync(x, pdfBytes);

            newInvoice.save()      
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
