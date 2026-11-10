import api from "../../utils/axios.js";

// Generate a new roadmap
export const generateRoadmapApi = async (payload) => {
  const { data } = await api.post("/api/roadmap/generate", payload);
  return data;
};

// Get all roadmaps
export const getAllRoadmapsApi = async () => {
  const { data } = await api.get("/api/roadmap/all");
  return data;
};

// Get roadmap by ID
export const getRoadmapByIdApi = async (roadmapId) => {
  const { data } = await api.get(`/api/roadmap/${roadmapId}`);
  return data;
};
