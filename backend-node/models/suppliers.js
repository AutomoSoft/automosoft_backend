const mongoose = require('mongoose');
const Schema = mongoose.schema;

const supplierSchema = mongoose.Schema({
    name: { type: String, require: true },
    supplierId: { type: String, require: true, unique: true },
    address: { type: String, require: true },
    contactNumber: { type: String, require: true },
    itemType: { type: String, require: true },
    itemId: { type: String, require: true, unique: true },
    brand: { type: String, require: true },
    note: { type: String, require: true },


    
});

module.exports = mongoose.model("Supplier", supplierSchema);