
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://dammikar1996:dammika@cluster0.vbavzsh.mongodb.net/?retryWrites=true&w=majority', {
 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected...");
};

module.exports = connectDB;