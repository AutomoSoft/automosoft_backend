const mongoose = require('mongoose');
const Schema = mongoose.schema;

const purchaseOrdersSchema = mongoose.Schema({
    dateApplied: { type: String, require: true },
    itemid: { type: String, require: true },
    quantity: { type: Number, require: true },
    supplierid: { type: String, require: true },
    dateReceived: { type: String, require: true },
    lastmodifiedby: { type: String, require: true },
    lastmodifiedon: { type: String, require: true },
    status: { type: String, require: true }
});

const purchaseOrders = module.exports = mongoose.model("purchaseOrders", purchaseOrdersSchema);