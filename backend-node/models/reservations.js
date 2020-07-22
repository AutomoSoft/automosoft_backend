const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.schema;

const reservationSchema = mongoose.Schema({
    custID: { type: String, require: true },
    dateposted: {type: String, require: true},
    daterequested: { type: String, require: true },
    time: { type: String, require: true},
    repairtype: { type: String, require: true },
    problembrief: { type: String, require: true },
    status: { type: String, require: true },
});

const Reservations = module.exports = mongoose.model("Reservations", reservationSchema );