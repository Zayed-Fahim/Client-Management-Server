const mongoose = require("mongoose");
require("dotenv").config();

const url =
  process.env.MONGODB_CLOUD_DATABASE || process.env.MONGODB_LOCAL_DATABASE;

const connect = async () => {
  try {
    await mongoose.connect(url).then(() => {
      console.log("Successfully Established connection");
    });
  } catch (error) {
    console.error("Failed to connect", error.message);
  }
};

module.exports = connect;
