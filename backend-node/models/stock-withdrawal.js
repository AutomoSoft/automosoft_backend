const mongoose = require('mongoose');

const stockWithdrawalSchema = mongoose.Schema({
  jobNo: { type: String, require: true  },
  customerid: { type: String, require: true },
  vehicle: { type: String, require: true },
  foremanid: { type: String, require: true },
  collectedby: { type: String, require: true },
  date: { type: String, require: true },
  items: [
    {
      itemtype: { type: String, require: true },
      itemId: { type: String, require: true },
      qty: { type: Number, require: true }
    }
  ]
});

const StockWithdrawal = module.exports = mongoose.model("StockWithdrawal", stockWithdrawalSchema);