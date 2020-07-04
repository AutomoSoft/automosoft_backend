const mongoose = require('mongoose');
const Schema = mongoose.schema;

const replySchema = mongoose.Schema({
    //_id: { type: String, require: true},
    subject: { type: String, require: true },
    content: { type: String, require: true },
    email: {type: String, require: true}
    
});

module.exports = mongoose.model("Reply", replySchema);