const mongoose = require("mongoose");

const drafSchema = new mongoose.Schema({
  serviceId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const Draf = mongoose.model("Draf", drafSchema);

module.exports = Draf;