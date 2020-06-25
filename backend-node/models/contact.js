const mongoose = require('mongoose');
const Schema = mongoose.schema;

const contactSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    subject: { type: String, require: true },
    content: { type: String, require: true },
    addedon: { type: String, require: true },
    isRead: {type:Boolean},
    isArchived: {type:Boolean},
    
});

module.exports = mongoose.model("Contact", contactSchema);
