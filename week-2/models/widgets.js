const mongoose = require('mongoose');

const partsSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { strict: false })

const widgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parts: { type: [partsSchema] }
});

module.exports = mongoose.model("widgets", widgetSchema);
