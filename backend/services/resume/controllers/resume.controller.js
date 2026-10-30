import mongoose from "mongoose";
import fs from "fs/promises";

import Resume from "../models/resume.model.js";
import resumeAgent from "../agents/resume.agent.js";
import extractText from "../config/pdf.js";
import redis from "../../../shared/redis/redis.js";

export const uploadResume = async (req, res) => {
  let filePath;

  try {
    // 1. Check uploaded file
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume PDF file.",
      });
    }

    filePath = file.path;

    // 2. Get user ID from API Gateway
    const userId = req.headers["x-user-id"];

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid user ID.",
      });
    }

    // 3. Extract text from PDF
    const resumeText = await extractText(file.path);

    if (!resumeText || !resumeText.trim()) {
      return res.status(422).json({
        success: false,
        message: "Unable to extract text from the uploaded PDF.",
      });
    }

    // 4. Analyze resume using AI Agent
    const aiResponse = await resumeAgent(resumeText);

    if (!aiResponse) {
      return res.status(500).json({
        success: false,
        message: "Resume analysis failed.",
      });
    }

    const resumeData = await Resume.findOneAndUpdate(
      { userId },
      {
        $set: {
          extractedText: resumeText,
          ...aiResponse,
        },
        $setOnInsert: {
          userId,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    await redis.set(`resume:${userId}`,JSON.stringify(resumeData));

    // 6. Send response
    return res.status(200).json({
      success: true,
      message: "Resume uploaded and analyzed successfully.",
      data: resumeData,
    });
  } catch (error) {
    console.error("Upload Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  } finally {
    // 7. Delete temporary uploaded file
    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (cleanupError) {
        console.error("File cleanup error:", cleanupError.message);
      }
    }
  }
};


export const getResume = async (req, res) => {
  try {
    // 1. Get user ID from API Gateway
    const userId = req.headers["x-user-id"];

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid user ID.",
      });
    }

    const cacheKey = `resume:${userId}`;

    // 2. Check Redis cache
    const cachedResume = await redis.get(cacheKey);

    if (cachedResume) {
      return res.status(200).json({
        success: true,
        message: "Resume fetched successfully.",
        data: JSON.parse(cachedResume),
        source: "cache",
      });
    }

    // 3. Fetch resume from MongoDB
    const resumeData = await Resume.findOne({ userId }).lean();

    if (!resumeData) {
      return res.status(404).json({
        success: false,
        message: "Resume not found. Please upload your resume first.",
      });
    }

    // 4. Store resume in Redis
    await redis.set(cacheKey, JSON.stringify(resumeData));

    // 5. Send response
    return res.status(200).json({
      success: true,
      message: "Resume fetched successfully.",
      data: resumeData,
      source: "database",
    });
  } catch (error) {
    console.error("Get Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};