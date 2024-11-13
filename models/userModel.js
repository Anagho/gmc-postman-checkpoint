// Import Mongoose
import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  status: {
    type: String,
    default: "inactive"
  }
});

// Create the User model
const User = new mongoose.model("User", userSchema);

// Export the UserModel
export default User;
