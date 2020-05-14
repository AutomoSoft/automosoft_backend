const express = require('express');
const router = express.Router();
const Supplier = require("../models/suppliers");

router.post("/register", (req, res, next) => {
    const supplier= new Supplier({
        name: req.body.name,
        supplierId: req.body.supplierId,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        itemType: req.body.itemType,
        itemId: req.body.itemId,
        brand: req.body.brand,
        note: req.body.note,
        
    });
    supplier.save()
            .then(result => {
                res.status(201).json({
                    message: "Supplier registered successfully",
                    result: result
                });
                
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
});

router.get("/register", (req, res, next) => {
    Supplier.find().then(documents => {
            res.status(200).json({
                message:"registerd suppliers fetched successfully",
                result: documents
            });
        });

    

});







module.exports = router;