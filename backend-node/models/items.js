const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.schema;


//customer & employees
const itemSchema = mongoose.Schema({
    itemtype: { type: String, require: true },
    itemid: { type: String, require: true, index: true, unique: true },
    itemname: { type: String, require: true },
    buying: { type: String, require: true },
    selling: { type: String, require: true },
    addedby: { type: String, require: true },
    addedon: { type: String, require: true },
    lastmodifiedby: { type: String, require: true },
    lastmodifiedon: { type: String, require: true },
    filepath: { type: String, require: true }
});

const Items = module.exports = mongoose.model("Items", itemSchema);
