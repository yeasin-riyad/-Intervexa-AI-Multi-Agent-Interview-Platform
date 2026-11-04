
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineArrowLeft,
  HiOutlineArrowDownTray,
  HiOutlineTrophy,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineLightBulb,
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

import "./Step3Report.css";

const Step3Report = ({ report, user, setUser }) => {
  const navigate = useNavigate();

  // Interview data
  const data = report || {};

  // Support both nested and direct report structures
  const reportData = data.report || data;

  const questions = Array.isArray(data.questions)
    ? data.questions
    : [];

  const strengths = Array.isArray(reportData.strengths)
    ? reportData.strengths
    : [];

  const weaknesses = Array.isArray(reportData.weaknesses)
    ? reportData.weaknesses
    : [];

  const recommendations = Array.isArray(reportData.recommendations)
    ? reportData.recommendations
    : [];

  // Overall score
  const score = Math.min(
    100,
    Math.max(0, Number(reportData.overallScore) || 0)
  );

  // Count answered questions
  const answeredQuestions = useMemo(() => {
    return questions.filter(
      (item) =>
        typeof item.userAnswer === "string" &&
        item.userAnswer.trim().length > 0
    ).length;
  }, [questions]);

  // Performance level
  const getPerformance = (value) => {
    if (value >= 90) return "Excellent";
    if (value >= 80) return "Very Good";
    if (value >= 70) return "Good";
    if (value >= 60) return "Average";
    if (value >= 40) return "Needs Improvement";

    return "Keep Practicing";
  };

  // Performance message
  const getScoreMessage = (value) => {
    if (value >= 90) {
      return "Outstanding performance! You did an excellent job.";
    }

    if (value >= 80) {
      return "Great work! You demonstrated strong interview skills.";
    }

    if (value >= 70) {
      return "Good effort! A little more practice will make you even better.";
    }

    if (value >= 60) {
      return "You're making progress. Focus on improving your weak areas.";
    }

    return "Every interview is a learning opportunity. Keep practicing!";
  };

  const performance = getPerformance(score);

  // Navigation
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  // Print / Save as PDF
  const handlePrint = () => {
    window.print();
  };

  // Format feedback values
  const formatFeedbackKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());
  };

  return (
    <main className="report-page">
      <div className="report-container">

        {/* Navbar */}
        <header className="report-navbar">
          <button
            type="button"
            className="report-back-btn"
            onClick={handleDashboard}
          >
            <HiOutlineArrowLeft />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="report-download-btn"
            onClick={handlePrint}
          >
            <HiOutlineArrowDownTray />
            <span>Download Report</span>
          </button>
        </header>

        {/* Hero */}
        <section className="report-hero">
          <div className="report-hero-content">
            <div className="report-success-icon">
              <HiOutlineTrophy />
            </div>

            <span className="report-eyebrow">
              <HiOutlineSparkles />
              INTERVIEW COMPLETED
            </span>

            <h1>Your Interview Report</h1>

            <p>
              Your interview has been evaluated by AI. Here's a detailed
              breakdown of your performance and areas to improve.
            </p>

            <div className="report-hero-meta">
              <span>
                <HiOutlineBriefcase />
                {data.role || "Interview"}
              </span>

              <span>
                <HiOutlineDocumentText />

                {data.type === "hr"
                  ? "HR Interview"
                  : data.type === "technical"
                    ? "Technical Interview"
                    : "AI Interview"}
              </span>

              <span>
                <HiOutlineCheckCircle />
                {questions.length} Questions
              </span>
            </div>
          </div>
        </section>

        {/* Score overview */}
        <section className="report-overview">
          <div className="report-score-card">
            <div
              className="report-score-circle"
              style={{ "--score": `${score}%` }}
            >
              <div className="report-score-inner">
                <strong>{score}</strong>
                <span>/ 100</span>
              </div>
            </div>

            <div className="report-score-details">
              <span className="report-card-label">
                OVERALL SCORE
              </span>

              <h2>{performance}</h2>

              <p>{getScoreMessage(score)}</p>
            </div>
          </div>

          {/* Total Questions */}
          <div className="report-stat-card">
            <div className="report-stat-icon purple">
              <HiOutlineChatBubbleLeftRight />
            </div>

            <div>
              <span>Total Questions</span>
              <strong>{questions.length}</strong>
              <small>Questions in this interview</small>
            </div>
          </div>

          {/* Answered Questions */}
          <div className="report-stat-card">
            <div className="report-stat-icon green">
              <HiOutlineCheckCircle />
            </div>

            <div>
              <span>Answered Questions</span>
              <strong>{answeredQuestions}</strong>
              <small>Questions with an answer</small>
            </div>
          </div>
        </section>

        {/* AI Summary */}
        <section className="report-section">
          <div className="report-section-heading">
            <div className="report-heading-icon purple">
              <HiOutlineSparkles />
            </div>

            <div>
              <h2>AI Performance Summary</h2>

              <p>
                Here's what our AI interviewer thinks about your performance.
              </p>
            </div>
          </div>

          <div className="report-summary-card">
            <p>
              {reportData.summary ||
                "No performance summary is available for this interview."}
            </p>
          </div>
        </section>

        {/* Strengths and Weaknesses */}
        <section className="report-section">
          <div className="report-section-heading">
            <div className="report-heading-icon blue">
              <HiOutlineChartBar />
            </div>

            <div>
              <h2>Performance Analysis</h2>

              <p>
                Understand what you did well and where you can improve.
              </p>
            </div>
          </div>

          <div className="report-analysis-grid">

            {/* Strengths */}
            <div className="report-analysis-card strengths-card">
              <div className="report-analysis-title">
                <div className="report-analysis-icon">
                  <HiOutlineCheckCircle />
                </div>

                <div>
                  <h3>Your Strengths</h3>
                  <span>
                    {strengths.length} key strengths identified
                  </span>
                </div>
              </div>

              {strengths.length > 0 ? (
                <ul>
                  {strengths.map((item, index) => (
                    <li key={index}>
                      <HiOutlineCheckCircle />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="report-empty-text">
                  No strengths available.
                </p>
              )}
            </div>

            {/* Weaknesses */}
            <div className="report-analysis-card weaknesses-card">
              <div className="report-analysis-title">
                <div className="report-analysis-icon">
                  <HiOutlineExclamationTriangle />
                </div>

                <div>
                  <h3>Areas to Improve</h3>
                  <span>
                    {weaknesses.length} improvement areas identified
                  </span>
                </div>
              </div>

              {weaknesses.length > 0 ? (
                <ul>
                  {weaknesses.map((item, index) => (
                    <li key={index}>
                      <HiOutlineExclamationTriangle />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="report-empty-text">
                  No improvement areas available.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="report-section">
          <div className="report-section-heading">
            <div className="report-heading-icon orange">
              <HiOutlineLightBulb />
            </div>

            <div>
              <h2>AI Recommendations</h2>

              <p>
                Actionable tips to help you perform better next time.
              </p>
            </div>
          </div>

          <div className="report-recommendations">
            {recommendations.length > 0 ? (
              recommendations.map((item, index) => (
                <div
                  className="report-recommendation"
                  key={index}
                >
                  <div className="recommendation-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p>{item}</p>
                </div>
              ))
            ) : (
              <p className="report-empty-text">
                No recommendations available.
              </p>
            )}
          </div>
        </section>

        {/* Question-wise Feedback */}
        <section className="report-section">
          <div className="report-section-heading">
            <div className="report-heading-icon purple">
              <HiOutlineDocumentText />
            </div>

            <div>
              <h2>Question-wise Feedback</h2>

              <p>
                Review your answers and the AI feedback for each question.
              </p>
            </div>
          </div>

          <div className="report-questions">
            {questions.length > 0 ? (
              questions.map((item, index) => (
                <article
                  className="report-question-card"
                  key={item._id || index}
                >
                  <div className="report-question-top">
                    <span className="report-question-number">
                      QUESTION {String(index + 1).padStart(2, "0")}
                    </span>

                    {item.difficulty && (
                      <span
                        className={`report-difficulty ${String(
                          item.difficulty
                        ).toLowerCase()}`}
                      >
                        {item.difficulty}
                      </span>
                    )}
                  </div>

                  <h3>{item.question}</h3>

                  {/* User Answer */}
                  <div className="report-answer-block">
                    <span>Your Answer</span>

                    <p>
                      {item.userAnswer?.trim()
                        ? item.userAnswer
                        : "No answer was submitted for this question."}
                    </p>
                  </div>

                  {/* AI Feedback */}
                  {item.feedback && (
                    <div className="report-feedback-block">
                      <div className="report-feedback-heading">
                        <HiOutlineSparkles />
                        <span>AI Feedback</span>
                      </div>

                      {typeof item.feedback === "string" ? (
                        <p>{item.feedback}</p>
                      ) : (
                        <div className="report-feedback-content">
                          {Object.entries(item.feedback).map(
                            ([key, value]) => {
                              if (
                                value === null ||
                                value === undefined
                              ) {
                                return null;
                              }

                              const displayValue =
                                typeof value === "object"
                                  ? JSON.stringify(value, null, 2)
                                  : String(value);

                              return (
                                <div
                                  className="report-feedback-item"
                                  key={key}
                                >
                                  <strong>
                                    {formatFeedbackKey(key)}
                                  </strong>

                                  <p>{displayValue}</p>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="report-no-questions">
                No question-wise details are available.
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="report-cta">
          <div className="report-cta-icon">
            <HiOutlineSparkles />
          </div>

          <div className="report-cta-content">
            <h2>Keep Improving. Keep Growing.</h2>

            <p>
              Every interview makes you better. Practice again and turn your
              weaknesses into strengths.
            </p>
          </div>

          <button
            type="button"
            className="report-cta-btn"
            onClick={handleDashboard}
          >
            Back to Dashboard
            <HiOutlineArrowLeft />
          </button>
        </section>

        {/* Footer */}
        <footer className="report-footer">
          <span>Powered by IntervexaAI</span>
          <span>Your AI-powered interview partner</span>
        </footer>

      </div>
    </main>
  );
};

export default Step3Report;
