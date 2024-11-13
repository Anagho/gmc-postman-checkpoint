// import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import usersRoute from "./routes/userRoutes.js";

// Load environment variables from config/.env
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 8000;

// Import Databse connection
connectDB();

// middleware
app.use(express.json());

// routes
app.use('/api/users', usersRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
