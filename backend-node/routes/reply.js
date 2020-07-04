const express = require('express');
const router = express.Router();
const Contact = require("../models/contact");
const Reply = require("../models/reply")
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



/**********************************************************reply Email **************************************************************/

router.post("/reply", (req, res, next) => {
    
    const reply = new Reply({
        subject: req.body.subject,
        content: req.body.content,
        email: req.body.email
    })
    let mailOptions = {
        from: 'ravindyayrh@gmail.com',
        to: reply.email,
        subject: reply.subject,
        text: reply.content,
    }
    
        reply.save()
            .then(result => {
                console.log(result)
                res.json({ state: true, msg: "Data Inserted Successfully..!" });

                transporter.sendMail(mailOptions, function(err, data){
                    if (err) {
                        console.log('Error occurs!!!!', err);
                    }
                    else {
                        console.log('email sent!!!');
                    }
                });
            })
            .catch(error => {
                console.log(error)
                res.json({ state: false, msg: "Error Try again...!!!" });
            });

            
            

});

module.exports = router;