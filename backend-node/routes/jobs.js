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

/******************************************************** Get Ongoing Jobs *******************************************************/

router.get("/getOngoingJobs", function (req, res, next) {
    
    Job.find( {$or: [ { jobStatus: "Queued" }, { jobStatus: "Started" },{ jobStatus: "Partially Completed" }, ] }, { jobNo: 1, jobType: 1, custId: 1, jobStatus: 1 } )
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

/******************************************************** Get Current Jobs *******************************************************/
router.get("/getCurrentJobs", function (req, res) {
    Job.find( { jobStatus: "Started" }, { jobNo: 1, jobType: 1, custId: 1, jobStatus: 1, vehicle: 1 } )
      .select()
      .exec()
      .then(data => {
        console.log("Data Transfer Success..!");
        //console.log(data);
        res.json({ state: true, msg: "Data Transfer Success..!", data: data });
  
      })
      .catch(error => {
        console.log("Data Transfer Unsuccessful..!");
        res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
      })
  });



module.exports = router; 