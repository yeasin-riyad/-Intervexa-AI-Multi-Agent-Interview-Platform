import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineXMark,
  HiOutlineTrash,
  HiOutlineSparkles,
} from "react-icons/hi2";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ResumeUploadModal = ({
  isOpen,
  onClose,
  onAnalyze,
  isAnalyzing = false,
}) => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setError("");
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Only PDF files are allowed.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 20MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (!isAnalyzing) {
      handleFile(e.dataTransfer.files?.[0]);
    }
  };

  const handleClose = () => {
    if (isAnalyzing) return;

    setFile(null);
    setError("");
    onClose();
  };

  const handleAnalyze = async () => {
    if (!file || isAnalyzing) return;

    try {
      setError("");
      await onAnalyze?.(file);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Resume analysis failed. Please try again."
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-md sm:p-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90dvh] w-full max-w-[540px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#181818] shadow-2xl sm:rounded-[26px]"
          >
            {/* Header */}
            <div className="shrink-0 px-5 pb-4 pt-6 sm:px-8 sm:pt-7">
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                disabled={isAnalyzing}
                aria-label="Close modal"
                className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40 sm:right-5 sm:top-5"
              >
                <HiOutlineXMark size={21} />
              </button>

              {/* Progress */}
              <div className="mb-6 pr-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[2px] text-gray-500 sm:text-xs">
                    STEP 01 OF 02
                  </span>

                  <span className="text-xs text-gray-500">
                    50% completed
                  </span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-[#353535]">
                  <div className="h-full w-1/2 rounded-full bg-white" />
                </div>
              </div>

              {/* Heading */}
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <HiOutlineDocumentText
                    size={22}
                    className="text-white"
                  />
                </div>

                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Upload Your Resume
                </h2>

                <p className="mt-1.5 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  Upload your resume and let AI analyze your skills,
                  experience, and career potential.
                </p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-8 sm:pb-6">
              {/* Upload Area */}
              <div
                onClick={() =>
                  !file &&
                  !isAnalyzing &&
                  fileInputRef.current?.click()
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!isAnalyzing && !file) setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsDragging(false);
                  }
                }}
                onDrop={handleDrop}
                className={`flex min-h-[175px] flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-all duration-200 sm:min-h-[205px] sm:py-8 ${
                  isDragging
                    ? "border-white bg-white/10 scale-[1.01]"
                    : file
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : "cursor-pointer border-[#424242] bg-[#202020] hover:border-gray-400 hover:bg-[#252525]"
                } ${
                  isAnalyzing ? "pointer-events-none opacity-70" : ""
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  disabled={isAnalyzing}
                  className="hidden"
                />

                {file ? (
                  <>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <HiOutlineDocumentText
                        size={27}
                        className="text-white"
                      />
                    </div>

                    <p className="max-w-full break-all text-sm font-semibold text-white">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                      {" · "}
                      PDF Document
                    </p>

                    <button
                      type="button"
                      disabled={isAnalyzing}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setError("");
                      }}
                      className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-400 transition hover:text-red-300 disabled:opacity-40"
                    >
                      <HiOutlineTrash size={15} />
                      Remove file
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <HiOutlineCloudArrowUp
                        size={30}
                        className={`transition ${
                          isDragging ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </div>

                    <p className="text-sm font-semibold text-white sm:text-base">
                      {isDragging
                        ? "Drop your resume here"
                        : "Drag & drop your resume"}
                    </p>

                    <p className="mt-1.5 text-xs text-gray-500">
                      or click to browse files
                    </p>

                    <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                      <span className="text-[10px] font-semibold tracking-wider text-gray-400">
                        PDF
                      </span>
                      <span className="h-3 w-px bg-white/10" />
                      <span className="text-[10px] text-gray-400">
                        Maximum 20MB
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Information */}
              <div className="mt-4 flex items-start gap-2">
                <HiOutlineSparkles
                  size={16}
                  className="mt-0.5 shrink-0 text-gray-500"
                />
                <p className="text-[11px] leading-relaxed text-gray-500">
                  Our AI will evaluate your resume and provide
                  personalized feedback to help improve your interview
                  readiness.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-white/10 bg-[#181818] px-5 py-4 sm:px-8 sm:py-5">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 sm:py-4 sm:text-base ${
                  file && !isAnalyzing
                    ? "bg-white text-black hover:bg-gray-200 active:scale-[0.99]"
                    : "cursor-not-allowed bg-[#333333] text-gray-500"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <HiOutlineSparkles size={19} />
                    Analyze Resume
                  </>
                )}
              </button>

              <p className="mt-2 text-center text-[10px] text-gray-600">
                Secure upload · Your resume stays private
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeUploadModal;
