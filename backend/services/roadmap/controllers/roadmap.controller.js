
import graph from "../graph/roadmap.graph.js";
import Roadmap from "../models/roadmap.model.js";

export const generateRoadmap = async (req, res) => {
  try {
    const {
      role,
      targetPackage,
      useResume = false,
      resume = null,
    } = req.body;

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
