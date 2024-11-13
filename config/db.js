// import "dotenv/config";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from config/.env
dotenv.config({ path: './.env' });

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
