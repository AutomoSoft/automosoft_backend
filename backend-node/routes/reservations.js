const express = require('express');
const router = express.Router();
const Reservations = require('../models/reservations');

/******************************************************** Create a Reservation *******************************************************/

router.post("/makeReservation", function (req, res) {
    console.log("req.body")
    console.log(JSON.stringify(req.body));
    
    var newReservation = new Reservations({
        custID: req.body.custID,
        dateposted: req.body.dateposted,
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


/******************************************************** View All Reservations *******************************************************/

router.get("/viewAllReservations", function (req, res, next) {
    
    Reservations.find({},{custID:1, dateposted:1, daterequested:1, time:1, repairtype:1, problembrief:1, status:1})    
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



/******************************************************** View Reservations Job Category Wise *******************************************************/

router.get("/getReservations/:category", function (req, res, next) {

    const category = req.params.category;

    if(category=="all"){          
        Reservations.find({},{custID:1, daterequested:1, time:1, repairtype:1, problembrief:1, status:1})    
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Transfer Unsuccessfull..!" });
            })

    }else{                                                                         
        Reservations.find({ repairtype: category })    
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
    }
    
});

    
module.exports = router;