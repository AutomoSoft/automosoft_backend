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
        addedon:req.body.addedon,
        isRead: false,
        isArchived: false,
       
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
/************************************************Mark As Read ***************************************************************/

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
        
    });
    /************************************************Mark As UnRead ***************************************************************/

    router.put("/unRead/:id", (req, res, next) => {
        Contact.findByIdAndUpdate(req.params.id,{
            $set: {isRead:false}
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
            
        });
    /************************************************Archive *********************************************************************/

    router.put("/isArchived/:id", (req, res, next) => {
        Contact.findByIdAndUpdate(req.params.id,{
            $set: {isArchived:true}
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
            
        });

    /************************************************get all emails ***************************************************************/

    router.get("/getAllEmails", function (req, res, next) {
    
        Contact.find( {}, { name: 1, email: 1, subject: 1, content: 1, isRead: 1, addedon: 1, isArchived: 1} )
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


/********************************************************Delete Email************************************************************************/

//delete Email
router.delete("/deleteEmail/:_id", function (req, res, next) {
    const _id = req.params._id;
    Contact.findOneAndRemove({ _id: _id })       //find supid and delete user
        .exec()
        .then(data => {
            console.log("Successfully removed Email..!")
            res.json({ state: true, msg: "Successfully removed Email..!" });

        })
        .catch(error => {
            console.log("Failed to remove  Data")
            res.json({ state: false, msg: "Failed to remove Data" });
        })
})


module.exports = router;