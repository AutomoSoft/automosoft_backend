const mongoose = require('mongoose');
const Schema = mongoose.schema;

const purchaseOrderRequestsSchema = mongoose.Schema({
    itemId: { type: String, require: true },
    itemName: { type: String, require: true },
    itemType: { type: String, require: true },
    quantity: { type: Number, require: true },
    supplierId: { type: String, require: true },
    supplierEmail: { type: String, require: true },
    supplierName: { type: String, require: true },
    emailSubject: { type: String, require: true },
    emailText: { type: String, require: true }
});

const purchaseOrderRequests = module.exports = mongoose.model("purchaseOrderRequests", purchaseOrderRequestsSchema);