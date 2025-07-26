/** @format */

import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // Extract token from cookies
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    // Verify the JWT token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token contains a valid user ID
    if (tokenDecode.id) {
      // Attach userId to req object (not req.body) for downstream use
      req.userId = tokenDecode.id; // Changed from req.body.userId to req.userId
    } else {
      return res.json({
        success: false,
        message: "Not Authorized. Please Login Again.",
      });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors during token verification
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
