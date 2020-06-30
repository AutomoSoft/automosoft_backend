const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');

/******************************************************** Add New Job *******************************************************/

router.post("/addNewJob", function (req, res) {
    console.log(req.body)

        var newJob = new Job({
            jobNo: req.body.jobNo,
            jobType: req.body.jobType,
            custId: req.body.custId,
            vehicle: req.body.vehicle,
            probCus: req.body.probCus,
            foremanObv: req.body.foremanObv,
            technicians: req.body.technicians,
            itemsUsed: req.body.itemsUsed,
            addedby:req.body.addedby,
            addedon:req.body.addedon,
            lastmodifiedby:req.body.lastmodifiedby,
            lastmodifiedon:req.body.lastmodifiedon,
            estCharge:req.body.estCharge,
            amountPaid:req.body.amountPaid,
            balance:req.body.balance,
            jobStatus:req.body.jobStatus,
        });
        console.log(newJob)
       newJob.save()      //save job data
            .then(result => {
                console.log(result)
                res.json({ state: true, msg: "Job Card Created Successfully..!" });
            })
            .catch(error => {
                console.log(error)
                res.json({ state: false, msg: "Error Try again...!!!" });
            })

             
        });





module.exports = router; 