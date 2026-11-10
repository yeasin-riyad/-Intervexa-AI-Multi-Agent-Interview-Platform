import redis from "../../../shared/redis/redis.js";
import graph from "../graph/roadmap.graph.js";
import Roadmap from "../models/roadmap.model.js";

const CACHE_TTL = 5 * 60; // 5 minutes
export const generateRoadmap = async (req, res) => {
  try {
    const { role, targetPackage, useResume = false, resume = null } = req.body;

    // 1. Get authenticated user ID
    const userId = req.headers["x-user-id"];

    // 2. Validate user ID
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User ID is required.",
      });
    }

    // 3. Validate required fields
    if (!role?.trim() || !targetPackage?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Role and target package are required.",
      });
    }

    // 4. Validate resume
    if (useResume && !resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required when useResume is true.",
      });
    }

    // 5. Execute LangGraph
    const result = await graph.invoke({
      role,
      targetPackage,
      useResume,
      resume,
    });

    // 6. Check graph result
    if (result.error || !result.roadmap) {
      return res.status(500).json({
        success: false,
        message: result.error || "Failed to generate roadmap.",
      });
    }

    // 7. Save roadmap to MongoDB
    const roadmap = await Roadmap.create({
      userId,
      ...result.roadmap,
    });

    try {
      // 1. Cache the newly created roadmap
      await redis.set(
        `roadmap:${userId}:${roadmap._id}`,
        JSON.stringify(roadmap),
        "EX",
        CACHE_TTL,
      );

        // 2. Invalidate user's roadmap list cache
      await redis.del(`roadmaps:user:${userId}`);
    } catch (cacheError) {
      console.error("Roadmap Cache Invalidation Error:", cacheError.message);
    }

    // 8. Send success response
    return res.status(201).json({
      success: true,
      message: "Roadmap generated successfully.",
      roadmap,
    });
  } catch (error) {
    console.error("Generate Roadmap Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

export const getAllRoadmap = async (req, res) => {
  try {
    // 1. Get authenticated user ID
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User ID is required.",
      });
    }

    // 2. Create a unique cache key for each user
    const cacheKey = `roadmaps:user:${userId}`;

    // 3. Check Redis cache
    try {
      const cachedRoadmaps = await redis.get(cacheKey);

      if (cachedRoadmaps) {
        console.log("Roadmap Cache Hit:", userId);

        return res.status(200).json({
          success: true,
          message: "Roadmaps fetched successfully.",
          totalRoadmaps: JSON.parse(cachedRoadmaps).length,
          roadmaps: JSON.parse(cachedRoadmaps),
          cached: true,
        });
      }
    } catch (cacheError) {
      console.error("Redis Cache Read Error:", cacheError.message);
    }

    console.log("Roadmap Cache Miss:", userId);

    // 4. Fetch roadmaps from MongoDB
    const roadmaps = await Roadmap.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    // 5. Store result in Redis
    try {
      await redis.set(cacheKey, JSON.stringify(roadmaps), "EX", CACHE_TTL);

      console.log("Roadmaps Cached:", userId);
    } catch (cacheError) {
      console.error("Redis Cache Write Error:", cacheError.message);
    }

    // 6. Send response
    return res.status(200).json({
      success: true,
      message: "Roadmaps fetched successfully.",
      totalRoadmaps: roadmaps.length,
      roadmaps,
      cached: false,
    });
  } catch (error) {
    console.error("Get All Roadmaps Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch roadmaps.",
    });
  }
};

export const getRoadmapById = async (req, res) => {
  try {
    // 1. Get roadmap ID and authenticated user ID
    const { id } = req.params;
    const userId = req.headers["x-user-id"];

    // 2. Validate user ID
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User ID is required.",
      });
    }

    // 3. Validate roadmap ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid roadmap ID.",
      });
    }

    // 4. Create unique cache key
    const cacheKey = `roadmap:${userId}:${id}`;

    // 5. Check Redis cache
    try {
      const cachedRoadmap = await redis.get(cacheKey);

      if (cachedRoadmap) {
        console.log("Roadmap Cache Hit:", id);

        return res.status(200).json({
          success: true,
          message: "Roadmap fetched successfully.",
          roadmap: JSON.parse(cachedRoadmap),
          cached: true,
        });
      }
    } catch (cacheError) {
      console.error("Redis Cache Read Error:", cacheError.message);
    }

    console.log("Roadmap Cache Miss:", id);

    // 6. Fetch roadmap from MongoDB
    const roadmap = await Roadmap.findOne({
      _id: id,
      userId,
    }).lean();

    // 7. Check roadmap existence
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    // 8. Store roadmap in Redis
    try {
      await redis.set(cacheKey, JSON.stringify(roadmap), "EX", CACHE_TTL);

      console.log("Roadmap Cached:", id);
    } catch (cacheError) {
      console.error("Redis Cache Write Error:", cacheError.message);
    }

    // 9. Send response
    return res.status(200).json({
      success: true,
      message: "Roadmap fetched successfully.",
      roadmap,
      cached: false,
    });
  } catch (error) {
    console.error("Get Roadmap By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch roadmap.",
    });
  }
};
