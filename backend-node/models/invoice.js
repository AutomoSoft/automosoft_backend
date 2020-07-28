const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.schema;

const invoiceSchema = mongoose.Schema({
    invoiceNo: { type: String, require: true, index: true, unique: true  },
    invoiceDate: { type: String, require: true },
    po: { type: String, require: true },
    jobNo:{type: String, require: true},
    jobDate: { type: String, require: true },
    custId: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    vehicleNo: {type: String, require: true},
    engineNo: {type: String, require: true},
    itemsUsed:{ type: Array, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    grandTotal: { type: Number, require: true },
    amountPaid: { type: Number, require: true },
    balance: { type: Number, require: true },
    note: {type: String, require:true},
    createdBy: { type: String, require: true },
   
});

const Invoice = module.exports = mongoose.model("Invoice", invoiceSchema);