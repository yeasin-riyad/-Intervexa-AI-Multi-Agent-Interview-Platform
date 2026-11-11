import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

const SESSION_TTL = 7 * 24 * 60 * 60; // 7 days

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Firebase token missing",
      });
    }

    // Verify Firebase ID token
    const decoded = await getAuth(app).verifyIdToken(token);

    // Find existing user
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    // Create user if not found
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name || "User",
        email: decoded.email,
        avatar: decoded.picture || "",
      });
    }

    // Create Redis session
    const sessionId = crypto.randomUUID();

    const sessionData = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      interviewCoin: user.interviewCoin,
    };

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(sessionData),
      "EX",
      SESSION_TTL,
    );

    // Set HTTP-only session cookie
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_TTL * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Google authentication failed",
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Get session ID from cookie
    const sessionId = req.cookies?.session;

    // Delete Redis session
    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }

    // Clear session cookie
    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      message: "Logout failed",
    });
  }
};




export const useCoins = async (req, res) => {
  try {
    // Get session ID from cookies
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // Get session from Redis
    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // Parse session data
    const sessionData = JSON.parse(session);

    // Get coins and action from request body
    const { coins, action } = req.body;

    // Validate coin amount
    if (!Number.isSafeInteger(coins) || coins <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid coin amount.",
      });
    }

    // Validate action
    if (!action || typeof action !== "string" || !action.trim()) {
      return res.status(400).json({
        success: false,
        message: "Action is required.",
      });
    }

    // Find user
    const user = await User.findById(sessionData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check available coins
    if (user.interviewCoin < coins) {
      return res.status(400).json({
        success: false,
        message: "Insufficient interview coins.",
        requiredCoins: coins,
        availableCoins: user.interviewCoin,
      });
    }

    // Deduct coins
    user.interviewCoin -= coins;
    await user.save();

    // Update Redis session
    const updatedSessionData = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      interviewCoin: user.interviewCoin,
    };

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(updatedSessionData),
      "EX",
      SESSION_TTL
    );

    // Success response
    return res.status(200).json({
      success: true,
      message: `${coins} interview coins deducted successfully.`,
      action: action.trim(),
      coinsUsed: coins,
      remainingCoins: user.interviewCoin,
      user: updatedSessionData,
    });

  } catch (error) {
    console.error("Use Coins Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while deducting coins.",
    });
  }
};
