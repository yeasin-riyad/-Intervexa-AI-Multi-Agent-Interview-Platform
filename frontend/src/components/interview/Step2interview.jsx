import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import {
  HiOutlineMicrophone,
  HiOutlineVideoCamera,
  HiOutlineVideoCameraSlash,
  HiOutlineCodeBracket,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlinePaperAirplane,
  HiOutlineUserCircle,
  HiOutlineUser,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineArrowRight,
} from "react-icons/hi2";

import maleVideo from "../../assets/male-ai.mp4";
import femaleVideo from "../../assets/female-ai.mp4";

// Score bar-এ দেখানোর জন্য লেবেল
const SCORE_METRICS = [
  { key: "correctness", label: "Correctness" },
  { key: "clarity", label: "Clarity" },
  { key: "relevance", label: "Relevance" },
  { key: "detail", label: "Detail" },
  { key: "efficiency", label: "Efficiency" },
  { key: "communication", label: "Communication" },
  { key: "problemSolving", label: "Problem Solving" },
  { key: "creativity", label: "Creativity" },
];

const Step2interview = ({ interviewData, user, onSubmitAnswer }) => {
  const navigate = useNavigate();

  const questions = interviewData?.questions || [];
  const initialIndex = interviewData?.currentQuestion || 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [question, setQuestion] = useState(
    questions[initialIndex] || interviewData?.question || null,
  );

  // Answer
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");

  // Feedback object
  const [feedback, setFeedback] = useState(null);
  const [feedbackType, setFeedbackType] = useState(""); // "success" | "error" | ""
  const [loading, setLoading] = useState(false);

  // ⬇️ পরের প্রশ্ন জমা রাখার state (এখন ref নয়, state ব্যবহার করছি যাতে UI re-render হয়)
  const [pendingNext, setPendingNext] = useState(null);

  // Timer
  const [timeLeft, setTimeLeft] = useState(question?.timer || 60);
  const [timerActive, setTimerActive] = useState(true);

  // UI
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  // AI Voice
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [subtitle, setSubtitle] = useState(
    `Welcome ${user?.name || "Candidate"}! Let's begin your interview.`,
  );
  const [voiceGender, setVoiceGender] = useState("female");

  // Refs
  const aiVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);

  const answerRef = useRef("");
  const codeRef = useRef("");
  const questionTextRef = useRef("");
  const currentIndexRef = useRef(currentIndex);

  const warningPlayedRef = useRef(false);
  const submitLockRef = useRef(false);

  const videoSource =
    voiceGender === "female" ? femaleVideo : maleVideo;
  const candidateName = user?.name || "Candidate";
  const totalQuestions = questions.length || 1;

  const questionText =
    typeof question === "string"
      ? question
      : question?.question || "Your interview question will appear here.";

  const difficulty =
    question?.difficulty || interviewData?.difficulty || "easy";

  const timerDuration = question?.timer || 60;

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);
  useEffect(() => {
    codeRef.current = code;
  }, [code]);
  useEffect(() => {
    questionTextRef.current = questionText;
  }, [questionText]);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const circumference = 2 * Math.PI * 44;
  const timerProgress =
    timerDuration > 0 ? (timeLeft / timerDuration) * 100 : 0;
  const strokeOffset =
    circumference - (timerProgress / 100) * circumference;

  // =========================================
  // AI VOICE
  // =========================================
  const speakText = (text, gender = voiceGender) => {
    if (!text || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = gender === "female" ? 1.15 : 0.85;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((voice) =>
      gender === "female"
        ? /female|samantha|zira|google us english/i.test(voice.name)
        : /male|david|daniel|google uk english male/i.test(voice.name),
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsAIPlaying(true);
    utterance.onend = () => setIsAIPlaying(false);
    utterance.onerror = () => setIsAIPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!questionText) return;
    setSubtitle(questionText);
    warningPlayedRef.current = false;
    submitLockRef.current = false;

    const timeout = setTimeout(() => speakText(questionText), 400);
    return () => {
      clearTimeout(timeout);
      window.speechSynthesis?.cancel();
      setIsAIPlaying(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionText]);

  const handleToggleVoiceGender = () => {
    const nextGender = voiceGender === "female" ? "male" : "female";
    setVoiceGender(nextGender);
    if (questionTextRef.current) {
      setTimeout(() => speakText(questionTextRef.current, nextGender), 150);
    }
  };

  // =========================================
  // NEXT QUESTION APPLY (Next বাটনে ক্লিক করলে)
  // =========================================
  const handleNextQuestion = () => {
    const payload = pendingNext;
    if (!payload) return;

    window.speechSynthesis?.cancel();

    setPendingNext(null);

    setQuestion(payload.question);
    setCurrentIndex(payload.nextIndex);
    setAnswer("");
    setCode("");
    answerRef.current = "";
    codeRef.current = "";

    setFeedback(null);
    setFeedbackType("");

    setTimeLeft(payload.timer || 60);
    warningPlayedRef.current = false;
    submitLockRef.current = false;
    setTimerActive(true);
  };

  // =========================================
  // SUBMIT
  // =========================================
  const handleSubmitAnswer = async (autoSubmitted = false) => {
    if (submitLockRef.current || loading) return;

    const answerValue = answerRef.current.trim();
    const codeValue = codeRef.current.trim();

    if (!autoSubmitted && !answerValue && !codeValue) {
      setFeedback({ feedback: "Please write or speak your answer first." });
      setFeedbackType("error");
      return;
    }

    if (!onSubmitAnswer) {
      setFeedback({ feedback: "Answer submission API is not connected." });
      setFeedbackType("error");
      return;
    }

    submitLockRef.current = true;

    try {
      setLoading(true);
      setFeedback(null);
      setFeedbackType("");
      setTimerActive(false);
      setMicOn(false);

      recognitionRef.current?.stop();

      const finalAnswer = [
        answerValue,
        codeValue ? `\n\nCode:\n${codeValue}` : "",
      ].join("");

      const result = await onSubmitAnswer({
        interviewId: interviewData?._id || interviewData?.interviewId,
        answer: finalAnswer,
        autoSubmitted,
      });

      if (!result?.success) {
        setFeedback({
          feedback: result?.message || "Failed to submit your answer.",
        });
        setFeedbackType("error");
        if (!autoSubmitted) setTimerActive(true);
        submitLockRef.current = false;
        return;
      }

      // ---------- Interview completed ----------
      if (result.completed || result.interview?.status === "completed") {
        setSubtitle("Congratulations! Your interview is completed.");
        speakText("Congratulations! Your interview is completed.");

        setTimeout(() => {
          navigate(
            `/interview/${interviewData?._id || interviewData?.interviewId}/report`,
            { replace: true },
          );
        }, 2000);
        return;
      }

      // ---------- Feedback normalize ----------
      const rawFeedback = result.feedback;

      let feedbackObj = null;

      if (rawFeedback && typeof rawFeedback === "object") {
        feedbackObj = {
          score: rawFeedback.score ?? null,
          correctness: rawFeedback.correctness ?? null,
          clarity: rawFeedback.clarity ?? null,
          relevance: rawFeedback.relevance ?? null,
          detail: rawFeedback.detail ?? null,
          efficiency: rawFeedback.efficiency ?? null,
          communication: rawFeedback.communication ?? null,
          problemSolving: rawFeedback.problemSolving ?? null,
          creativity: rawFeedback.creativity ?? null,
          feedback:
            typeof rawFeedback.feedback === "string"
              ? rawFeedback.feedback
              : "",
          improvements: Array.isArray(rawFeedback.improvements)
            ? rawFeedback.improvements
            : [],
        };
      } else {
        feedbackObj = {
          score: null,
          feedback:
            typeof rawFeedback === "string"
              ? rawFeedback
              : result.message ||
                "Answer submitted. Preparing the next question...",
          improvements: [],
        };
      }

      setFeedback(feedbackObj);
      setFeedbackType("success");

      if (feedbackObj.feedback) {
        speakText(feedbackObj.feedback);
      }

      // ⬇️ পরের প্রশ্ন state-এ রাখি — কিন্তু show করি না, Next বাটনে ক্লিক করলে
      if (result.question) {
        const nextIndex =
          result.currentQuestion ?? currentIndexRef.current + 1;

        setPendingNext({
          question: result.question,
          nextIndex,
          timer: result.question.timer || 60,
        });
      }
    } catch (error) {
      console.error("Submit Answer Error:", error);
      setFeedback({
        feedback: error?.message || "Something went wrong while submitting.",
      });
      setFeedbackType("error");
      if (!autoSubmitted) setTimerActive(true);
      submitLockRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // TIMER
  // =========================================
  useEffect(() => {
    if (!timerActive || timeLeft <= 0 || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((previous) => (previous <= 1 ? 0 : previous - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timerActive, timeLeft, loading]);

  useEffect(() => {
    if (timeLeft !== 10 || warningPlayedRef.current) return;
    warningPlayedRef.current = true;
    const warning = "10 seconds remaining. Please complete your answer.";
    setSubtitle(warning);
    speakText(warning);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft !== 0 || submitLockRef.current) return;
    setTimerActive(false);
    const message =
      answerRef.current.trim() || codeRef.current.trim()
        ? "Time is up! I'm submitting your answer now."
        : "Time is up! No answer was provided. I'm submitting now.";
    setSubtitle(message);
    speakText(message);
    handleSubmitAnswer(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // =========================================
  // CAMERA
  // =========================================
  useEffect(() => {
    let isMounted = true;
    const startCamera = async () => {
      if (!cameraOn) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (userVideoRef.current) userVideoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Camera Error:", error);
        if (isMounted) {
          setCameraOn(false);
          setFeedback({ feedback: "Unable to access your camera." });
          setFeedbackType("error");
        }
      }
    };
    startCamera();
    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [cameraOn]);

  // =========================================
  // SPEECH RECOGNITION
  // =========================================
  useEffect(() => {
    if (!micOn || loading || !timerActive) {
      recognitionRef.current?.stop();
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback({
        feedback: "Speech recognition is not supported in this browser.",
      });
      setFeedbackType("error");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      if (transcript.trim()) {
        setAnswer((prev) =>
          prev ? `${prev} ${transcript.trim()}` : transcript.trim(),
        );
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (err) {
      console.error("Speech Recognition:", err);
    }
    return () => recognition.stop();
  }, [micOn, loading, timerActive]);

  // Cleanup
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // feedback show হলে textarea/submit disable, next বাটন active
  const isFeedbackShown = feedbackType === "success" && !!feedback;
  const isNextAvailable = isFeedbackShown && !!pendingNext;

  // =========================================
  // UI
  // =========================================
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#090a0f] text-white p-2 sm:p-3 lg:p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="h-full w-full max-w-[1800px] mx-auto bg-[#101116] border border-white/[0.06] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[30%_70%]"
      >
        {/* LEFT PANEL */}
        <div className="p-3 sm:p-4 border-b lg:border-b-0 lg:border-r border-white/[0.07] flex flex-col gap-2.5 min-h-0">
          <div
            className="relative rounded-xl overflow-hidden bg-[#191a22] border border-white/[0.06] shrink-0"
            style={{ height: "clamp(180px, 26vh, 260px)" }}
          >
            <video
              key={videoSource}
              ref={aiVideoRef}
              src={videoSource}
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              className="w-full h-full object-cover object-top"
            />
            {isAIPlaying && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded-full">
                <div className="flex items-center gap-[2px] h-3">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      animate={{ height: ["3px", "10px", "3px"] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: item * 0.15,
                      }}
                      className="w-[2px] bg-emerald-400 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-medium">AI Speaking</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-medium capitalize">
              {voiceGender} AI
            </div>
          </div>

          <div className="min-h-[36px] bg-[#191a22] border border-white/[0.05] rounded-lg flex items-center justify-center px-3 py-1.5 text-center shrink-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={subtitle}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-gray-300 line-clamp-2"
              >
                {subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative flex-1 min-h-0 bg-[#191a22] border border-white/[0.05] rounded-xl overflow-hidden flex items-center justify-center">
            {cameraOn ? (
              <video
                ref={userVideoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-full bg-[#292b35] border border-white/10 flex items-center justify-center text-xl font-semibold">
                  {candidateName.charAt(0).toUpperCase()}
                </div>
                <p className="text-xs text-gray-400">{candidateName}</p>
              </div>
            )}
            {cameraOn && (
              <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded-full text-[10px]">
                Your Camera
              </div>
            )}
          </div>

          <div className="flex justify-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMicOn((p) => !p)}
              title={micOn ? "Turn off microphone" : "Turn on microphone"}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all ${
                micOn
                  ? "bg-[#252731] text-white hover:bg-[#323541]"
                  : "bg-red-500/20 text-red-400 border border-red-500/20"
              }`}
            >
              <HiOutlineMicrophone className={micOn ? "" : "opacity-40"} />
            </button>
            <button
              type="button"
              onClick={() => setCameraOn((p) => !p)}
              title={cameraOn ? "Turn off camera" : "Turn on camera"}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-base bg-[#252731] text-gray-300 hover:bg-[#323541]"
            >
              {cameraOn ? <HiOutlineVideoCamera /> : <HiOutlineVideoCameraSlash />}
            </button>
            <button
              type="button"
              onClick={() => setCodeOpen((p) => !p)}
              title="Toggle code editor"
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-base ${
                codeOpen
                  ? "bg-indigo-600 text-white"
                  : "bg-[#252731] text-gray-300 hover:bg-[#323541]"
              }`}
            >
              <HiOutlineCodeBracket />
            </button>
            <button
              type="button"
              onClick={handleToggleVoiceGender}
              title={`Switch to ${voiceGender === "female" ? "male" : "female"} AI`}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-base bg-[#252731] text-white hover:bg-[#323541]"
            >
              {voiceGender === "female" ? <HiOutlineUserCircle /> : <HiOutlineUser />}
            </button>
          </div>

          <div className="text-center space-y-1 shrink-0">
            <p className={`text-[10px] font-medium ${micOn ? "text-emerald-400" : "text-red-400"}`}>
              {micOn ? "Microphone active" : "Microphone paused"}
            </p>
            <p className="text-[10px] text-gray-500">
              AI voice: <span className="capitalize text-gray-300">{voiceGender}</span>
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-3 sm:p-4 lg:p-5 flex flex-col min-w-0 min-h-0">
          <div className="flex items-start justify-between gap-3 mb-3 shrink-0">
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold">
                AI Interview
              </h1>
              <div className="flex items-center gap-1.5 mt-1 text-gray-400 text-xs">
                <HiOutlineClock className="text-sm" />
                <span className="capitalize">{difficulty}</span>
              </div>
            </div>
            <div className="relative w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="44" stroke="#292b35" strokeWidth="7" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke={timeLeft <= 10 ? "#ef4444" : "#10b981"}
                  strokeWidth="7"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-sm sm:text-base font-semibold tabular-nums ${
                    timeLeft <= 10 ? "text-red-400" : "text-white"
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
            {/* Question */}
            <div className="bg-[#191a22] border border-white/[0.05] rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#111217]">
                  <HiOutlineChatBubbleLeftRight className="text-sm" />
                </div>
                <p className="text-xs text-gray-400">Question {currentIndex + 1}</p>
              </div>
              <h2 className="text-sm sm:text-base leading-relaxed font-medium">
                {questionText}
              </h2>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="text-gray-400 tabular-nums">
                  {currentIndex + 1}/{totalQuestions}
                </span>
              </div>
              <div className="w-full h-1 bg-[#292b35] rounded-full overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{
                    width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>

            {/* Answer */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-300">Your Answer</label>
              {micOn && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Voice input enabled
                </span>
              )}
            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={
                micOn
                  ? "Write your answer here... or speak if mic is on"
                  : "Write your answer here..."
              }
              disabled={loading || isFeedbackShown}
              className="w-full h-[110px] resize-none bg-[#191a22] border border-white/[0.06] rounded-xl p-3 text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:border-indigo-500/50 transition-all disabled:opacity-60"
            />

            {/* Code editor */}
            <AnimatePresence>
              {codeOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-300">
                      <HiOutlineCodeBracket />
                      Your Code
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="// Write your code here..."
                      spellCheck={false}
                      disabled={loading || isFeedbackShown}
                      className="w-full h-[140px] resize-none bg-[#0d0e13] border border-white/[0.06] rounded-lg p-3 text-xs font-mono text-emerald-300 placeholder:text-gray-600 outline-none focus:border-indigo-500/50 disabled:opacity-60"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FEEDBACK CARD */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`rounded-xl p-3 sm:p-4 border ${
                    feedbackType === "success"
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : "bg-red-500/10 border-red-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {feedbackType === "success" ? (
                      <HiOutlineCheckCircle className="text-emerald-400 text-base" />
                    ) : (
                      <HiOutlineExclamationCircle className="text-red-400 text-base" />
                    )}
                    <p
                      className={`text-xs font-semibold ${
                        feedbackType === "success"
                          ? "text-emerald-300"
                          : "text-red-400"
                      }`}
                    >
                      {feedbackType === "success"
                        ? "Feedback on your answer"
                        : "Notice"}
                    </p>

                    {feedbackType === "success" &&
                      typeof feedback.score === "number" && (
                        <span className="ml-auto text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                          Score: {feedback.score}
                        </span>
                      )}
                  </div>

                  {feedback.feedback && (
                    <p
                      className={`text-xs leading-relaxed ${
                        feedbackType === "success"
                          ? "text-emerald-100/90"
                          : "text-red-300"
                      }`}
                    >
                      {feedback.feedback}
                    </p>
                  )}

                  {feedbackType === "success" &&
                    SCORE_METRICS.some(
                      (m) => typeof feedback[m.key] === "number",
                    ) && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {SCORE_METRICS.map(({ key, label }) => {
                          const value = feedback[key];
                          if (typeof value !== "number") return null;
                          return (
                            <div key={key}>
                              <div className="flex items-center justify-between text-[10px] mb-0.5">
                                <span className="text-gray-400">{label}</span>
                                <span className="text-gray-300 tabular-nums">
                                  {value}
                                </span>
                              </div>
                              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${value}%` }}
                                  transition={{ duration: 0.6 }}
                                  className="h-full bg-emerald-400 rounded-full"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  {Array.isArray(feedback.improvements) &&
                    feedback.improvements.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[10px] font-semibold text-amber-300 uppercase tracking-wide mb-1">
                          Improvements
                        </p>
                        <ul className="space-y-1">
                          {feedback.improvements.map((item, index) => (
                            <li
                              key={index}
                              className="text-xs text-amber-100/90 flex gap-1.5"
                            >
                              <span className="text-amber-400">•</span>
                              <span>
                                {typeof item === "string"
                                  ? item
                                  : JSON.stringify(item)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {isNextAvailable && (
                    <p className="text-[10px] text-gray-400 mt-3 italic">
                      Click “Next Question” when you are ready to continue.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SUBMIT / NEXT */}
          <div className="mt-3 shrink-0">
            <div className="border-t border-white/[0.07] pt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-[10px] sm:text-xs text-gray-500">
                {isFeedbackShown
                  ? "Read the feedback, then continue to the next question."
                  : timeLeft <= 10 && timeLeft > 0
                    ? "Hurry up! Time is running out."
                    : "Submit your answer before time runs out."}
              </p>

              {/* Feedback দেখানোর পর Next button */}
              {isNextAvailable ? (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto min-w-[150px] px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-400 transition-all"
                >
                  Next Question
                  <HiOutlineArrowRight className="text-sm" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSubmitAnswer(false)}
                  disabled={
                    loading ||
                    isFeedbackShown ||
                    (!answer.trim() && !code.trim())
                  }
                  className="w-full sm:w-auto min-w-[150px] px-4 py-2 rounded-lg bg-white text-[#101116] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Answer
                      <HiOutlinePaperAirplane className="text-sm" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Step2interview;