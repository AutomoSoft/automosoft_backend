const mongoose = require('mongoose');
const Schema = mongoose.schema;

const contactSchema = mongoose.Schema({
    //_id: { type: String, require: true},
    name: { type: String, require: true },
    email: { type: String, require: true },
    subject: { type: String, require: true },
    content: { type: String, require: true },
    addedon: { type: String, require: true },
    reply: { type: String},
    isRead: {type:Boolean},
    isArchived: {type:Boolean},
    replySubject: {type: String},
    replyMessage: {type:String},
    
});

module.exports = mongoose.model("Contact", contactSchema);

module.exports.findByemailid = function (_id, callback) {
    const query = { _id: _id };

    Contact.findOne(query, callback);
};

module.exports.findEmailById = function (_id, callback) {
    Contact.findOne(_id, callback);
};
