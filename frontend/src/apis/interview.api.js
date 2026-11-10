
import api from "../../utils/axios.js";



// Start Interview
export const startInterviewApi = async (payload) => {
  try {
    const response = await api.post("/api/interview/start", payload);

    return response.data;
  } catch (error) {
    console.error(
      "Start Interview API Error:",
      error.response?.data || error
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to start interview.",
    };
  }
};

// Get Interview
export const getInterview = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/${interviewId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get Interview API Error:",
      error.response?.data || error
    );

    return {
        data:null,
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch interview.",
    };
  }
};

export const submitAnswerApi = async (payload) => {
    try {
        const response = await api.post("/api/interview/answer", payload);
        return response.data;
    } catch (error) {
        console.error("Submit Answer API Error:", error.response?.data || error);

        return {
            success: false,
            message:
                error.response?.data?.message ||
                error.message ||
                "Failed to submit answer.",
        };
    }
};

export const getAllInterview = async (params = {}) => {
  try {
    const response = await api.get("/api/interview/all-interviews", { params });

    return response.data;
  } catch (error) {
    console.error(
      "Get Interview API Error:",
      error.response?.data || error
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch interviews.",
      interviews: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }
};