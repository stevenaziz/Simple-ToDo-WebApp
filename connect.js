const mongoose = require("mongoose");

const connectionString = 
"mongodb+srv://TeamX:1234@cluster0.glhvt.mongodb.net/TM-Tx?retryWrites=true&w=majority";

const connectDB = (url) => {
  return mongoose.connect(connectionString,
    {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports = connectDB;
