const mongoose = require("mongoose");

const connectionString = 
"mongodb+srv://Team1:1234@cluster0.glhvt.mongodb.net/TM-T1?retryWrites=true&w=majority";

const connectDB = (url) => {
  return mongoose.connect(connectionString,
    {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports = connectDB;
