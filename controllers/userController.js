/** @format */

import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    // Use req.userId set by the userAuth middleware
    const userId = req.userId; // Changed from req.body.userId to req.userId

    // Find user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Return user data
    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
