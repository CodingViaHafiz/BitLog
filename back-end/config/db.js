const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("conneted to database successfully!");
  } catch (error) {
    console.log("error while connecting to database: ", error);
  }
};
module.exports = connection;
