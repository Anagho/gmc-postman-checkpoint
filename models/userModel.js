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

// Pre-save hook to set the status based on age
userSchema.pre('save', function (next) {
  // If age is less than 20, set status to 'inactive'
  if (this.age < 20) {
    this.status = 'inactive';
  } else {
    this.status = 'active';  // Otherwise, set status to 'active'
  }
  next(); // Proceed to save the document
});

// Create the User model
const User = new mongoose.model("User", userSchema);

// Export the UserModel
export default User;
