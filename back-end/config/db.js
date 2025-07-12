const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost:27017/"
    );
    console.log("conneted to database successfully!");
  } catch (error) {
    console.log("error while connecting to database: ", error);
  }
};
module.exports = connection;
