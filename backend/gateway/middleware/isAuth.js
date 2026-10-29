
import redis from "../../shared/redis/redis.js";

export const isAuth = async (req, res, next) => {
  try {
    // Get session ID from cookie
    const sessionId = req.cookies?.session;
    // console.log(sessionId,"....Hi")

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please log in first.",
      });
    }

    // Retrieve session from Redis
    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      res.clearCookie("session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return res.status(401).json({
        success: false,
        message: "Session expired or invalid. Please log in again.",
      });
    }

    // Parse session data
    const user = JSON.parse(session);

    if (!user.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid session. Please log in again.",
      });
    }

    // Attach authenticated user to request
    req.user = user;
    // console.log(user,"USER...")

    return next();
  } catch (error) {
    console.error("Authentication middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
};
