const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');

const Nexmo = require('nexmo')
 
const nexmo = new Nexmo({
  apiKey: "1fea229b",
  apiSecret: "ECJ8E37RzBi50jlt"
})

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
            subTotal:'0',
            tax:'0',
            grandTotal:'0',
            amountPaid: 0,
            balance:'0',
            lastpaymentdate:' ',
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
    
    Job.find( {$or: [ { jobStatus: "Queued" }, { jobStatus: "Started" },{ jobStatus: "Partially Completed" }, { jobStatus: "Halfway" }] }, { jobNo: 1, jobType: 1, custId: 1, jobStatus: 1} ).sort( { _id: -1 })
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

  /******************************************************** Get Current Jobs *******************************************************/


  router.get("/viewJob/:jobid", function (req, res, next) {
    const jobNo = req.params.jobid;
   
        Job.findOne({ jobNo: jobNo })    
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Job Not Found!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    
});

  /******************************************************** Update Job Status *******************************************************/

  router.post("/updateStatus/:jobid", function (req, res) {
    var accountId = "AC6bac2239c2323511e7c873c162b5afd2";
    var authToken = "5a305a0b474c004cd95e9e4df8164b32";

    var twilio = require("twilio");
    var client = new twilio(accountId, authToken);
    const jobNo = req.params.jobid;
    //console.log(req.body.jobStatus)
    //console.log(jobNo)
 
    
    Job.updateOne({ jobNo: jobNo }, { $set: { jobStatus: req.body.jobStatus, lastmodifiedby: req.body.lastmodifiedby, lastmodifiedon: req.body.lastmodifiedon}})  
    .exec()
        .then(data => {
            console.log("Status Updated Successfully!")
            res.json({ state: true, msg: "Data Updated Successfully!" });

        })
        .catch(error => {
            console.log("Failed to Update Status!!!")
            res.json({ state: false, msg: "Failed to Update Data!!!" });
        })
        client.messages.create({
            body: "\n"+req.body.custId +", "+"\n"+ req.body.jobNo +" has been "+req.body.jobStatus,
            to: req.body.contactnumber,
            from:"+16183703018",
        })
        //console.log(req.body.contactnumber)
        .then(data => {
            console.log("SMS was sent..!");
            //console.log(data);
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });
      
          })
          .catch(error => {
            console.log("Data Transfer Unsuccessful..!");
            res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
          })   
});

/******************************************************** Update Job Items *******************************************************/

router.post("/addJobItems", function (req, res) {
    

    const items = req.body.items;
    const jobNo = req.body.jobNo;
    // console.log(req.body.items)

    Job.updateOne({ jobNo: jobNo }, { $push: {itemsUsed: req.body.items} }, {$set: { lastmodifiedby: req.body.foremanid, lastmodifiedon: req.body.date}})
        .exec()
        .then(data => {
            console.log("Status Updated Successfully!")
            res.json({ state: true, msg: "Data Updated Successfully!" });

        })
        .catch(error => {
            console.log("Failed to Update Status!!!")
            res.json({ state: false, msg: "Failed to Update Data!!!" });
        })
});




/***************************************************************view technician jobs ********************************/
router.get("/viewtechnicianJob/:techId", function (req, res, next) {
    const techId = req.params.techId;
    //const techID = "TEC001";
    Job.find({'technicians':{$elemMatch:{$elemMatch:{$in:[techId]}}}})
   
    //Job.find( { technicians: "TEC001","2020-07-02T18:34:45.841Z" }) 
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Job Not Found!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    
});

/******************************************************************remove technician job ********************************************/
router.get("/deleteTechnicianJob/:jobid", function (req, res, next) {
    const jobNo = req.params.jobid;
    //const techID = "TEC001";
    Job.update({jobNo:jobNo },{ $pull: { technicians:{$elemMatch:{$elemMatch:{$in:["TEC001"]}} }} },
        { multi: true }
      )
   
    //Job.find( { technicians: "TEC001","2020-07-02T18:34:45.841Z" }) 
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Job Not Found!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    
});
/*****************************************************************Get completed jobs *****************************************************/
router.get("/getCompletedJobs", function (req, res) {
    Job.find( { jobStatus: "Completed"})
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

  /*****************************************************************send sms *******************************************************/
router.post("/sendSMS", function(req, res){
    console.log(req.body)   
    
      
    var accountId = "AC6bac2239c2323511e7c873c162b5afd2";
    var authToken = "f4ef8de038aad6b9899dee4c5a07ec12";

    var twilio = require("twilio");
    var client = new twilio(accountId, authToken);
    
    client.messages.create({
        body: req.body.jobStatus,
        to: "+94778024051",
        from:"+16183703018",
    })
    .then(data => {
        console.log("SMS was sent..!");
        //console.log(data);
        res.json({ state: true, msg: "Data Transfer Success..!", data: data });
  
      })
      .catch(error => {
        console.log("Data Transfer Unsuccessful..!");
        res.json({ state: false, msg: "Data Transfer Unsuccessful..!" });
      })
})
router.post("/nexmo", function(req, res){
    let text = "Whatevr"
 
        nexmo.message.sendSms("Nexmo",req.body.contactnumber, req.body.custId, {
        type: "unicode"
        }, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
            } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
})

});

/************************************************************* Update Job Charges ************************************************/


router.post("/updateCharges", function (req, res) {
    
    const jobNo = req.body.jobNo;

    Job.updateOne({ jobNo: jobNo },  {
        $set: { subTotal: req.body.subTotal, tax: req.body.tax, grandTotal: req.body.grandTotal, balance: req.body.balance, lastpaymentdate: req.body.invoiceDate },
        $inc: { amountPaid: req.body.amountPaid }})
        .exec()
        .then(data => {
            console.log("Job Details Updated Successfully!")
            res.json({ state: true, msg: "Data Updated Successfully!" });

        })
        .catch(error => {
            console.log("Failed to Update Details!!!")
            res.json({ state: false, msg: "Failed to Update Data!!!" });
        })
});



/***********************************************************Get Job history of a customer ******************************************/

router.get("/viewServices/:custId", function (req, res, next) {
    const custId = req.params.custId;
   
        Job.find({ custId: custId })    
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });
                

            })
            .catch(error => {
                console.log("Job Not Found!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    
});







  module.exports = router; 
