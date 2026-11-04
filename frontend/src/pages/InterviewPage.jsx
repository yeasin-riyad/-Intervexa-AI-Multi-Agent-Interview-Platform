
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getInterview,
    submitAnswerApi,
} from "../apis/interview.api";

import Step2interview from "../components/interview/Step2interview";

const InterviewPage = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [interview, setInterview] = useState(null);
    const [error, setError] = useState("");

    // Fetch interview
    useEffect(() => {
        const fetchInterview = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getInterview(id);

                if (!response?.success || !response?.interview) {
                    setError(
                        response?.message || "Failed to fetch interview."
                    );
                    return;
                }

                const data = response.interview;

                if (data.status === "completed") {
                    navigate(`/interview/${id}/report`, {
                        replace: true,
                    });
                    return;
                }

                setInterview(data);
            } catch (error) {
                console.error("Fetch Interview Error:", error);
                setError(error?.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInterview();
        }
    }, [id, navigate]);

    // Submit answer
    const handleSubmitAnswer = async (payload) => {
        const response = await submitAnswerApi(payload);

        return response;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#090a0f]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">
                        Loading your interview...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#090a0f] px-4">
                <p className="text-red-400 text-center">{error}</p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (!interview) return null;

    return (
        <Step2interview
            interviewData={interview}
            user={user}
            onSubmitAnswer={handleSubmitAnswer}
        />
    );
};

export default InterviewPage;
