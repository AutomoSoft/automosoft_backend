const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.schema;


//customer & employees
const supplierSchema = mongoose.Schema({
    usertype: { type: String, require: true },
    supname: { type: String, require: true },
    supid: { type: String, require: true, index: true, unique: true },
    address: { type: String, require: true },
    contactnumber: { type: String, require: true },
    itemtype: { type: String, require: true },
    itemid: { type: String, require: true },
    brand: { type: String, require: true },
    note: { type: String, require: true }
});

const Suppliers = module.exports = mongoose.model("Suppliers", supplierSchema);


