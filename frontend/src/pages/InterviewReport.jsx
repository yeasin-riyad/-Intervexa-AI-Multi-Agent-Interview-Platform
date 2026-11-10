
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowPath, HiOutlineExclamationTriangle } from "react-icons/hi2";

import Step3Report from "../components/interview/step3report";
import { getInterview } from "../apis/interview.api";

const InterviewReport = ({ user, setUser }) => {
  const { id } = useParams();
  console.log(id,"Id..")
  const navigate = useNavigate();

  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getInterview(id);

        if (!response?.success || !response?.interview) {
          throw new Error(
            response?.message || "Failed to load interview report."
          );
        }

        if (response.interview.status !== "completed") {
          navigate(`/interview/${id}`, { replace: true });
          return;
        }

        if (isMounted) {
          setInterviewData(response.interview);
        }
      } catch (err) {
        console.error("Interview Report Error:", err);

        if (isMounted) {
          setError(
            err.message || "Something went wrong while fetching the report."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchReport();
    } else {
      setError("Interview ID is missing.");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  // Loading
  if (loading) {
    return (
      <div className="report-state-page">
        <div className="report-state-card">
          <div className="report-loading-spinner">
            <HiOutlineArrowPath />
          </div>

          <h2>Generating Your Report</h2>
          <p>
            Please wait while we fetch your interview results...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="report-state-page">
        <div className="report-state-card">
          <div className="report-error-icon">
            <HiOutlineExclamationTriangle />
          </div>

          <h2>Unable to Load Report</h2>
          <p>{error}</p>

          <button
            className="report-download-btn"
            onClick={() => window.location.reload()}
          >
            <HiOutlineArrowPath />
            Try Again
          </button>

          <button
            className="report-back-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!interviewData) return null;

  return (
    <Step3Report
      report={interviewData}
      user={user}
      setUser={setUser}
    />
  );
};

export default InterviewReport;
