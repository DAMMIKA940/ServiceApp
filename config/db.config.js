const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://dammikar1996:dammika@cluster0.vbavzsh.mongodb.net/?retryWrites=true&w=majority', {
 
  });
  console.log("MongoDB Connected...");
};

module.exports = connectDB;