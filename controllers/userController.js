// Import the User model
import User from "../models/userModel.js";

// GET: Return all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log("Users found");
    console.log(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// GET: Find a particular user by criteria (e.g., email, name, or id)
export const findUser = async (req, res) => {
  try {
    // Expect searchterm in the request body, such as{"searchterm": { "email": "user@example.com" }}
    const user = await User.findOne(req.body.searchterm);

    if (user) {
      res.status(200).json({ message: "User found", data: user });
      console.log("User found", user)
    } else {
      res.status(404).json({ message: "User not found" });
      console.log("User not found")
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding user", error });
  }
};

// POST: Add a new user to the database
export const createUser = async (req, res) => {
  // create a single user
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("User created successfully");
    console.log(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
    console.log("Error creating user", error);
  }
};

// POST: Create many users in the database
export const createManyUsers = async (req, res) => {
  try {
    const newUsers = await User.insertMany(req.body.users); // An array of users
    res
      .status(201)
      .json({ message: "Users created successfully", data: newUsers });

    console.log("Users created successfully");
    console.log(newUsers);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
    console.log("Error creating user", error);
  }
};

// PUT: Edit a user by ID
export const updateUser = async (req, res) => {
  try {
    // Find the user by it's ID and update
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // If user is not found
    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // User is found, show response
    res.status(200).json(updatedUser);
    console.log("User Updated",updatedUser)
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

// PUT: Update multiple users based on criteria
export const updateManyUsers = async (req, res) => {
  try {
    const { criteria, updates } = req.body;
    const result = await User.updateMany(criteria, updates);

    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: `${result.modifiedCount} users updated successfully`,
        result,
      });

      console.log("Users updated successfuly");
      console.log(result);
    } else {
      res.status(404).json({ message: "No users found to update" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating users", error });
  }
};

// DELETE: Remove a user by ID
export const deleteUser = async (req, res) => {
  try {
    // Find the user by it's ID and delete
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // If user is not found
    if (!deletedUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // User is found, show response
    res.status(200).json({ message: "User deleted successfully" });
    console.log("User deleted successfully!");
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// DELETE: Remove many users by condition
export const deleteManyUsers = async (req, res) => {
  try {
    // Conditions to delete users should be provided in the request body
    const result = await User.deleteMany(req.body.condition);
    res
      .status(200)
      .json({ message: `${result.deletedCount} users deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users", error });
  }
};
