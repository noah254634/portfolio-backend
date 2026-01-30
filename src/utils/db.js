// src/utils/db.js
import mongoose from "mongoose";
import ENV from "./env.js";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV().mongo_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
