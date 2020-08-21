//model to store withdrawals over time wrt a particular item
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.schema;

const itemusageSchema = mongoose.Schema({
    itemtype: { type: String, require: true },
    itemid: { type: String, require: true, index: true, unique: true },
    itemname: { type: String, require: true },
    usage: [
        {
          jobNo: { type: String, require: true  },
          qty: { type: Number, require: true },
          date: { type: Date, require: true },
        }
      ]
});

const ItemUsage = module.exports = mongoose.model("ItemUsage", itemusageSchema);