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


/******************************************************** View All Accepted Reservations *******************************************************/

router.get("/viewAllAcceptedReservations", function (req, res, next) {
    
    Reservations.find({ status: "accepted" })    
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



/******************************************************** View All Pending Reservations Job Category Wise *******************************************************/

router.get("/getReservations/:category", function (req, res, next) {

    const category = req.params.category;

    if(category=="all"){          
        Reservations.find({"status": "pending"},{custID:1, daterequested:1, time:1, repairtype:1, problembrief:1, status:1})    
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
        Reservations.find({ repairtype: category, status: "pending"})    
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


/******************************************************** View All Accepted Reservations Job Category Wise *******************************************************/

router.get("/getAcceptedReservations/:category", function (req, res, next) {

    const category = req.params.category;

    if(category=="all"){          
        Reservations.find({"status": "accepted"},{custID:1, daterequested:1, time:1, repairtype:1, problembrief:1, status:1})    
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
        Reservations.find({ repairtype: category, status:"accepted"})    
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


/******************************************************** Search All Reservations by id *******************************************************/

router.get("/findReservation/:reserv_id", function (req, res, next) {
    const reservation_id = req.params.reserv_id;
    Reservations.findByReservationid(reservation_id, function (err, reservation) {
        if (err) throw err;
        if (!reservation) {    //check the reservation available or not
            res.json({ state: false, msg: "No user found..!" });
            return;
        }
         Reservations.findOne({ _id: reservation_id })    //find reservation using userid
            .select() 
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                //console.log(data);
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    })
});


/******************************************************** View All Accepted Reservations For The Date *******************************************************/

router.get("/viewAcceptedReservationsForTheDate/:date", function (req, res, next) {

    const date = req.params.date;

                                                                      
    Reservations.find({ "daterequested": date, "status": "accepted" })    
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

/******************************************************** Accept a Reservation *******************************************************/

router.post("/acceptReservation/:resevid", function (req, res) {
    const resevid = req.params.resevid;
    //  console.log(req.body);
    //  console.log(resevid);
    const input = {
            foremanid: req.body.foremanid,
            dateaccepted: req.body.dateaccepted,
            status: "accepted",
    }
    
    Reservations.updateOne({ _id: resevid }, { $set: input })    //update reservation data with of the resevid passed
        .exec()
        .then(data => {
            console.log("Data Updated Successfully!")
            res.json({ state: true, msg: "Data Updated Successfully!" });

        })
        .catch(error => {
            console.log("Failed to Update Data!!!")
            res.json({ state: false, msg: "Failed to Update Data!!!" });
        })
});
    
module.exports = router;