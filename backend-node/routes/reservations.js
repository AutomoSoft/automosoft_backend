const express = require('express');
const router = express.Router();
const Reservations = require('../models/reservations');

/******************************************************** Create a Reservation *******************************************************/

router.post("/makeReservation", function (req, res) {
    console.log("req.body")
    console.log(JSON.stringify(req.body));
    
    var newReservation = new Reservations({
        custID: req.body.custID,
        daterequested: req.body.daterequested,
        time: req.body.time,
        repairtype: req.body.repairtype,
        problembrief: req.body.problembrief,
        status: req.body.status,
    });
    // console.log(newReservation)
    newReservation.save()      //save reservation data
        .then(result => {
            console.log(result)
            res.json({ state: true, msg: "Data Inserted Successfully..!" });
        })
        .catch(error => {
            console.log(error)
            res.json({ state: false, msg: "Error Try again...!!!" });
        })

            
    });


    /******************************************************** View All Pending Reservations *******************************************************/

    router.get("/viewAllPendingReservations", function (req, res, next) {
        
             Reservations.find({ status: "pending" })    
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