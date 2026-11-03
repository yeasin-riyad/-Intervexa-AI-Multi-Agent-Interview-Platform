
import api from "../../utils/axios.js";

export const startInterviewApi = async (payload) => {
    try {
        const response = await api.post(
            "/api/interview/start",
            payload
        );

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
