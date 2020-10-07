const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const pdfDoc = require("pdf-lib");
const fs = require("fs");
var dateFormat = require('dateformat');


/******************************************************** New Invoice *******************************************************/

router.post("/createInvoice", async function (req, res) {

    // console.log(req.body)
    const x = `./local_storage/invoices/${req.body.invoiceNo}.pdf`;         //pdf generated here


        var newInvoice = new Invoice({
            invoiceNo: req.body.invoiceNo,
            invoiceDate: req.body.invoiceDate,
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
        var Invday = (dateFormat(newInvoice.invoiceDate, "yyyy-mm-dd h:MM:ss")).toString();
        var Jobday = (dateFormat(newInvoice.jobDate, "yyyy-mm-dd h:MM:ss")).toString();
        // console.log(Invday)
        var Cusname = newInvoice.firstName.concat(" ", newInvoice.lastName)

        const uint8Array = fs.readFileSync(__dirname + "/invoice_template/Invoice.pdf");
        var doc = await pdfDoc.PDFDocument.load(uint8Array);
        const pages = doc.getPages();
        const page = pages[0];


        page.drawText(newInvoice.invoiceNo, {
            x: 450,
            y: 620,
            size: 12
          });

        page.drawText(Jobday, {
            x: 450,
            y: 565,
            size: 12
            });

        page.drawText(Invday, {
            x: 450,
            y: 585,
            size: 12
            });

        page.drawText(newInvoice.jobNo, {
            x: 450,
            y: 655,
            size: 12
            });

        page.drawText(newInvoice.custId, {
            x: 160,
            y: 632,
            size: 12
            });

        page.drawText(Cusname, {
            x: 160,
            y: 598,
            size: 12
            });

        page.drawText(newInvoice.vehicleNo, {
            x: 450,
            y: 530,
            size: 12
            });

        page.drawText((newInvoice.amountPaid).toString(), {
            x: 450,
            y: 110,
            size: 12
            });

        page.drawText((newInvoice.balance).toString(), {
            x: 450,
            y: 72,
            size: 12
            });

        page.drawText((newInvoice.tax).toString(), {
            x: 130,
            y: 72,
            size: 12
            });

        page.drawText((newInvoice.subTotal).toString(), {
            x: 130,
            y: 110,
            size: 12
            });

        page.drawText((newInvoice.grandTotal).toString(), {
            x: 130,
            y: 35,
            size: 12
            });

        var a = 0;
        for (i = 0; i < newInvoice.itemsUsed.length; i++) {
            page.drawText(newInvoice.itemsUsed[i].itemId, {
            x: 20,
            y: 415 + a,
            size: 12
            });
            a = a - 35;
        }

        var b = 0;
        for (i = 0; i < newInvoice.itemsUsed.length; i++) {
            page.drawText(newInvoice.itemsUsed[i].itemname, {
            x: 120,
            y: 415 + b,
            size: 12
            });
            b = b - 35;
        }

        var c = 0;
        for (i = 0; i < newInvoice.itemsUsed.length; i++) {
            page.drawText(newInvoice.itemsUsed[i].qty, {
            x: 390,
            y: 415 + c,
            size: 12
            });
            c = c - 35;
        }

        var d = 0;
        for (i = 0; i < newInvoice.itemsUsed.length; i++) {
            page.drawText((newInvoice.itemsUsed[i].unitprice).toString(), {
            x: 460,
            y: 415 + d,
            size: 12
            });
            d = d - 35;
        }

        var e = 0;
        for (i = 0; i < newInvoice.itemsUsed.length; i++) {
            page.drawText((newInvoice.itemsUsed[i].charge).toString(), {
            x: 530,
            y: 415 + e,
            size: 12
            });
            e = e - 35;
        }
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

/******************************************************** View All Invoices *******************************************************/

router.get("/viewAllInvoices", function (req, res, next) {
    
    Invoice.find({},{invoiceNo:1, invoiceDate:1, jobNo:1, jobDate:1, custId:1, firstName:1, lastName:1, vehicleNo:1,engineNo:1,subTotal:1, tax:1, grandTotal:1, amountPaid:1,balance:1,note:1,createdBy:1,filePath:1})    
        .select()
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!")
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });
            

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessfull..!")
            res.json({ state: false, msg: "Data Transfer Unsuccessfull..!" });
        })

});






module.exports = router; 
