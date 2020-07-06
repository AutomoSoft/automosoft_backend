const mongoose = require('mongoose');

const stockWithdrawalSchema = mongoose.Schema({
  jobno: { type: String, require: true  },
  customerid: { type: String, require: true },
  vehicle: { type: String, require: true },
  foremanid: { type: String, require: true },
  collectedby: { type: String, require: true },
  items: [
    {
      itemId: { type: String, require: true },
      qty: { type: Number, require: true }
    }
  ]
});

const StockWithdrawal = module.exports = mongoose.model("StockWithdrawal", stockWithdrawalSchema);