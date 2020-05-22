const express = require('express');
const router = express.Router();
const Contact = require("../models/contact");
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
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

router.post("/contactUs", (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.content,
        isRead: false,
       
    });
    let mailOptions = {
        from: 'ravindyayrh@gmail.com',
        to: contact.email,
        subject: contact.subject,
        text: "Thank you for your response. One of our agent will get back to you as soon as possible"
    }
    
        contact.save()
            .then(result => {
                res.status(201).json({
                    message: "contact sent",
                    result: result
                });
                transporter.sendMail(mailOptions, function(err, data){
                    if (err) {
                        console.log('Error occurs!!!!', err);
                    }
                    else {
                        console.log('email sent!!!');
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });

});
router.get("/emails", (req, res, next) => {
    Contact.find().then(result => {
            res.status(200).json({
                message:"messages fetched successfully",
                result: result
            });
        });

    

});
router.put("/isRead/:id", (req, res, next) => {
    Contact.findByIdAndUpdate(req.params.id,{
        $set: {isRead:true}
    } , 
    {
        new: true
    }
    ).then(result => {
        res.status(200).json({
            message:"updated successfully",
            result: result
        });
    });
    /*Contact.find().then(result => {
            res.status(200).json({
                message:"messages fetched successfully",
                result: result
            });
        });*/
        
    });




module.exports = router;