const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.schema;

const jobsSchema = mongoose.Schema({
    jobNo: { type: String, require: true, index: true, unique: true  },
    jobType: { type: String, require: true },
    custId: { type: String, require: true },
    vehicle: { type: String, require: true },
    probCus: { type: String, require: true },
    foremanObv: { type: String, require: true },
    technicians: { type: Array, require: true },
    itemsUsed:{ type: Array, require: true },
    addedon: { type: String, require: true },
    addedby: { type: String, require: true },
    lastmodifiedby: { type: String, require: true },
    lastmodifiedon: { type: String, require: true },
    estCharge: { type: Number, require: true },
    amountPaid: { type: Number, require: true },
    balance: { type: Number, require: true },
    jobStatus: { type: String, require: true }
});

const Jobs = module.exports = mongoose.model("Jobs", jobsSchema);