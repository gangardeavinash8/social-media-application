const mongoose = require("mongoose");

const uri =
  "mongodb+srv://gangardeavinash8:avi3222@cluster0.e7mabcv.mongodb.net/?retryWrites=true&w=majority";

module.exports = async () => {
  // MongoDB connection string

  // Connect to MongoDB using Mongoose
  await mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB :");
      // Do something after successful connection
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
