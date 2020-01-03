require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
  } catch (err) {}
};
