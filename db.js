const mongoose = require("mongoose");
const { mongoConnectionString } = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
  } catch (e) {
    console.log(e);
    throw new Error("Database connection failed");
  }
};

const disconnect = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
  } catch (e) {
    console.log(e);
    throw new Error("Cannot disconnect from database!");
  }
};

module.exports = {
  connect,
  disconnect,
};
