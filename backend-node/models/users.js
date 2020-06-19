const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.schema;


//customer & employees
const userSchema = mongoose.Schema({
    usertype: { type: String, require: true },
    userid: { type: String, require: true, index: true, unique: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    contactnumber: { type: String, require: true },
    gender: { type: String, require: true },
    nicnumber: { type: String, require: true },
    expertise: { type: String, require: true },
    capacity: { type: String, require: true },
    address: { type: String, require: true },
    addedby: { type: String, require: true },
    addedon: { type: String, require: true },
    lastmodifiedby: { type: String, require: true },
    lastmodifiedon: { type: String, require: true },
    vehicles: { type: Array, require: true },
    filepath: { type: String, require: true }
});

const Users = module.exports = mongoose.model("Users", userSchema);

module.exports.saveUser = function (newUser, callback) {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            console.log(hash);
            newUser.password = hash;

            if (err) {
                throw err;
            }
            else {
                newUser.save(callback);
            }
        });
    });
};

module.exports.findByUserid = function (userid, callback) {
    const query = { userid: userid };

    Users.findOne(query, callback);
};

module.exports.passwordCheck = function (plainpassword, hash, callback) {
    bcrypt.compare(plainpassword, hash, function (err, res) {
        if (err) throw err;

        if (res) {
            callback(null, res);
        } else {
            callback(err, false);
        }
    });
};

module.exports.findUserById = function (id, callback) {
    Users.findOne(id, callback);
};