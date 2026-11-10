
import express from "express";

import {
  generateRoadmap,
  getAllRoadmap,
  getRoadmapById,
} from "../controllers/roadmap.controller.js";


const roadmapRouter = express.Router();

// Generate a new roadmap
roadmapRouter.post("/generate", generateRoadmap);

// Get all roadmaps of authenticated user
roadmapRouter.get("/all",  getAllRoadmap);

// Get a specific roadmap by ID
roadmapRouter.get("/:id", getRoadmapById);

export default roadmapRouter;
