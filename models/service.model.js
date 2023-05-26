const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
