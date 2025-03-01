"use client";

import { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import {
  Moon,
  Sun,
  Instagram,
  ChevronRight,
  FileJson,
  Users,
  UserCheck,
  AlertTriangle,
  InfoIcon,
  Zap,
  Globe,
  Shield,
  Clock,
  Download,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [notFollowback, setNotFollowback] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState<"home" | "docs">("home");
  const [fileName, setFileName] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    // Check system preference for dark/light mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      setDarkMode(false);
    }

    // Initial animations
    setAnimateHero(true);
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });

    // Add particle effect
    const cleanup = initializeParticles();

    return () => {
      if (cleanup) cleanup();
    };
  }, [controls]);

  const initializeParticles = () => {
    // This would be implemented with a particle library in a real app
    // For this example, we'll simulate its presence
    console.log("Particle effect initialized");

    return () => {
      console.log("Particle effect cleaned up");
    };
  };

  const processingSteps = [
    "Membuka file...",
    "Membaca followers...",
    "Membaca following...",
    "Menganalisis data...",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);

      // Add file selection animation
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 },
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add(darkMode ? "bg-gray-700" : "bg-gray-100");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove(darkMode ? "bg-gray-700" : "bg-gray-100");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove(darkMode ? "bg-gray-700" : "bg-gray-100");

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);

      // Add file drop animation
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 },
      });
    }
  };

  const processZip = async () => {
    if (!file) {
      showToast("Pilih file ZIP terlebih dahulu!", "error");
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async function (event) {
        if (!event.target?.result) return;

        try {
          const zip = await JSZip.loadAsync(event.target.result as ArrayBuffer);

          // Step 1: Process complete
          await new Promise((resolve) => setTimeout(resolve, 800));
          setProcessingStep(1);

          let followers: string[] = [];
          let index = 1;

          while (
            zip.file(
              `connections/followers_and_following/followers_${index}.json`
            )
          ) {
            const content = await zip
              .file(
                `connections/followers_and_following/followers_${index}.json`
              )
              ?.async("string");

            if (!content) continue;

            const parsedData = JSON.parse(content);
            followers = followers.concat(
              parsedData.map(
                (user: { string_list_data: { value: string }[] }) =>
                  user.string_list_data[0].value
              )
            );
            index++;
          }

          // Step 2: Process complete
          await new Promise((resolve) => setTimeout(resolve, 800));
          setProcessingStep(2);

          const followingFile =
            "connections/followers_and_following/following.json";

          if (!zip.file(followingFile)) {
            setIsProcessing(false);
            showToast("File following.json tidak ditemukan dalam ZIP", "error");
            return;
          }

          const followingContent = await zip
            .file(followingFile)
            ?.async("string");

          if (!followingContent) {
            setIsProcessing(false);
            showToast("Konten following tidak dapat dibaca", "error");
            return;
          }

          const followingData =
            JSON.parse(followingContent)["relationships_following"];
          const following = followingData.map(
            (user: { string_list_data: { value: string }[] }) =>
              user.string_list_data[0].value
          );

          // Step 3: Process complete
          await new Promise((resolve) => setTimeout(resolve, 800));
          setProcessingStep(3);

          const notFollowbackUsers = following.filter(
            (user: string) => !followers.includes(user)
          );

          // Final delay before showing results
          await new Promise((resolve) => setTimeout(resolve, 800));

          setNotFollowback(notFollowbackUsers);
          setIsProcessing(false);

          if (notFollowbackUsers.length === 0) {
            showSuccessAnimation("Semua orang followback! 🎉");
          } else {
            showSuccessAnimation(
              `${notFollowbackUsers.length} impostor ditemukan!`
            );
          }
        } catch (error) {
          console.error("Error processing ZIP:", error);
          setIsProcessing(false);
          showToast(
            "Terjadi kesalahan saat memproses file. Pastikan format file benar.",
            "error"
          );
        }
      };

      reader.onerror = function () {
        setIsProcessing(false);
        showToast("Gagal membaca file.", "error");
      };
    } catch (error) {
      console.error("Error in process:", error);
      setIsProcessing(false);
      showToast("Terjadi kesalahan tidak terduga.", "error");
    }
  };

  const showSuccessAnimation = (message: string) => {
    setShowSuccessOverlay(true);
    setTimeout(() => {
      setShowSuccessOverlay(false);
    }, 2000);
  };

  const showToast = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    // This would be implemented with a toast library in a real app
    alert(message);
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800"
      }`}
    >
      {/* Animated Particles Background (would be implemented with a library) */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Particles would render here */}
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl shadow-2xl text-white text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: 1 }}
                className="text-6xl mb-4"
              >
                🔍
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Analisis Selesai!</h2>
              <p className="text-xl">Lihat hasil di bawah</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Glossy Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
          darkMode
            ? "bg-gray-900/90 backdrop-blur-lg border-b border-gray-800"
            : "bg-white/90 backdrop-blur-lg border-b border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-2xl font-bold flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mr-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Zap size={24} />
              </motion.div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Impostorgram
              </span>
            </motion.h1>

            <nav className="flex items-center space-x-1 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage("home")}
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  currentPage === "home"
                    ? darkMode
                      ? "bg-blue-600 shadow-lg shadow-blue-500/30"
                      : "bg-blue-500 shadow-lg shadow-blue-500/20 text-white"
                    : `hover:bg-opacity-20 ${
                        darkMode ? "hover:bg-gray-500" : "hover:bg-gray-200"
                      }`
                }`}
              >
                Home
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage("docs")}
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  currentPage === "docs"
                    ? darkMode
                      ? "bg-blue-600 shadow-lg shadow-blue-500/30"
                      : "bg-blue-500 shadow-lg shadow-blue-500/20 text-white"
                    : `hover:bg-opacity-20 ${
                        darkMode ? "hover:bg-gray-500" : "hover:bg-gray-200"
                      }`
                }`}
              >
                Panduan
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`ml-2 p-2 rounded-full transition-all ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-blue-500" />
                )}
              </motion.button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <AnimatePresence mode="wait">
          {currentPage === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={animateHero ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full text-center mb-12"
              >
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={animateHero ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Temukan Impostor
                  </span>{" "}
                  <span className={darkMode ? "text-white" : "text-gray-800"}>
                    di Instagram
                  </span>
                </motion.h2>
                <motion.p
                  className={`text-lg md:text-xl max-w-3xl mx-auto ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={animateHero ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Cek siapa saja yang tidak membalas follow akun Instagram kamu
                  dengan teknologi analisis canggih.
                </motion.p>

                <motion.div
                  className="mt-6 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={animateHero ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {[
                    { icon: <Shield size={20} />, text: "100% Aman" },
                    { icon: <Globe size={20} />, text: "Analisis Lokal" },
                    { icon: <Clock size={20} />, text: "Proses Cepat" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center px-4 py-2 rounded-full ${
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <span className="mr-2 text-blue-500">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Main Card with Glass Effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                className={`w-full max-w-2xl rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl 
                ${
                  darkMode
                    ? "bg-gray-800/50 border border-gray-700 shadow-blue-500/5"
                    : "bg-white/80 border border-gray-200 shadow-gray-300/30"
                }`}
              >
                <div className="p-8">
                  {/* File Upload Section */}
                  <motion.div
                    className={`relative mb-8 border-2 border-dashed rounded-2xl p-8 transition-all duration-300
                    ${
                      file
                        ? darkMode
                          ? "border-blue-500 bg-blue-900/10"
                          : "border-blue-400 bg-blue-50"
                        : darkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={controls}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".zip"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isProcessing}
                    />

                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className={`w-20 h-20 flex items-center justify-center rounded-full mb-4
                        ${
                          file
                            ? darkMode
                              ? "bg-blue-500/30"
                              : "bg-blue-100"
                            : darkMode
                            ? "bg-gray-700"
                            : "bg-gray-100"
                        }`}
                        initial={{ rotate: 0 }}
                        animate={file ? { rotate: [0, 15, -15, 0] } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {file ? (
                          <FileJson size={36} className="text-blue-500" />
                        ) : (
                          <Download
                            size={36}
                            className={
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }
                          />
                        )}
                      </motion.div>

                      <h3 className="text-xl font-bold mb-2">
                        {file
                          ? "File Siap Dianalisis"
                          : "Upload File Instagram"}
                      </h3>

                      <p
                        className={`text-sm mb-3 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {fileName
                          ? fileName
                          : "Drag & drop file ZIP Instagram atau klik untuk memilih"}
                      </p>

                      {!file && (
                        <p
                          className={`text-xs ${
                            darkMode ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          Format: .zip dari data Instagram
                        </p>
                      )}

                      {file && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setFile(null);
                            setFileName("");
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className={`mt-3 px-3 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          Ganti File
                        </motion.button>
                      )}
                    </div>
                  </motion.div>

                  {/* Tip Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`flex items-start gap-3 p-4 rounded-xl mb-8 ${
                      darkMode
                        ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30"
                        : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                        darkMode ? "bg-blue-500/20" : "bg-blue-100"
                      }`}
                    >
                      <InfoIcon className="text-blue-500" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Tidak tahu cara mendapatkan data?
                      </h4>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Lihat panduan lengkap untuk mendapatkan file ZIP data
                        Instagram Anda di halaman
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentPage("docs")}
                          className="ml-1 font-medium text-blue-500 hover:underline"
                        >
                          Panduan
                        </motion.button>
                        .
                      </p>
                    </div>
                  </motion.div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={
                      file && !isProcessing ? { scale: 1.02, y: -2 } : {}
                    }
                    whileTap={file && !isProcessing ? { scale: 0.98 } : {}}
                    onClick={processZip}
                    disabled={!file || isProcessing}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center relative overflow-hidden transition-all duration-300
                      ${
                        file && !isProcessing
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                          : "bg-gray-500 bg-opacity-20 cursor-not-allowed"
                      }
                    `}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>{processingSteps[processingStep]}</span>
                      </div>
                    ) : (
                      <>
                        <span className="relative z-10">Analisis Sekarang</span>
                        {file && (
                          <>
                            {/* Button background animation */}
                            <span className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"></span>
                            <span className="absolute right-0 -top-8 w-20 h-20 bg-white/10 rotate-45 transform transition-transform duration-700 ease-in-out group-hover:translate-x-10 group-hover:translate-y-10 z-0"></span>
                          </>
                        )}
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Results Section with 3D Animation */}
                <AnimatePresence>
                  {notFollowback.length > 0 && !isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className={`border-t ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <div className="p-8">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="mb-6 flex items-center"
                        >
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 
                            ${darkMode ? "bg-yellow-500/20" : "bg-yellow-100"}`}
                          >
                            <AlertTriangle
                              className="text-yellow-500"
                              size={24}
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">
                              Impostor Ditemukan!
                            </h3>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Daftar akun yang tidak followback Anda
                            </p>
                          </div>
                          <span
                            className={`ml-auto px-3 py-1 rounded-full text-sm font-medium 
                            ${
                              darkMode
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {notFollowback.length}
                          </span>
                        </motion.div>

                        <div
                          className={`rounded-xl overflow-hidden ${
                            darkMode
                              ? "bg-gray-900/70 border border-gray-800"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <div
                            className={`px-4 py-3 ${
                              darkMode ? "bg-gray-800" : "bg-gray-100"
                            } flex items-center`}
                          >
                            <Instagram
                              size={16}
                              className="mr-2 text-blue-500"
                            />
                            <span className="font-medium">
                              Instagram Username
                            </span>
                          </div>

                          <div className="overflow-y-auto max-h-96 p-2">
                            {notFollowback.map((user, index) => (
                              <motion.a
                                key={index}
                                href={`https://instagram.com/${user}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                                whileHover={{
                                  scale: 1.01,
                                  x: 5,
                                  backgroundColor: darkMode
                                    ? "rgba(59, 130, 246, 0.1)"
                                    : "rgba(59, 130, 246, 0.05)",
                                }}
                                className={`flex items-center p-3 mb-1 rounded-lg transition-all duration-150 ${
                                  darkMode
                                    ? "hover:bg-blue-900/10"
                                    : "hover:bg-blue-50"
                                }`}
                              >
                                <div
                                  className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 
                                  ${
                                    darkMode
                                      ? "bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-gray-800"
                                      : "bg-gradient-to-br from-purple-100 to-blue-100 border border-gray-200"
                                  }`}
                                >
                                  <Instagram
                                    size={18}
                                    className="text-blue-500"
                                  />
                                </div>
                                <span className="flex-grow font-medium">
                                  {user}
                                </span>
                                <ChevronRight
                                  size={18}
                                  className={
                                    darkMode ? "text-gray-500" : "text-gray-400"
                                  }
                                />
                              </motion.a>
                            ))}
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-6 text-center"
                        >
                          <p
                            className={`text-xs ${
                              darkMode ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            Klik pada username untuk membuka profil Instagram
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="docs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Documentation Page */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl ${
                  darkMode
                    ? "bg-gray-800/50 border border-gray-700 shadow-blue-500/5"
                    : "bg-white/80 border border-gray-200 shadow-gray-300/30"
                }`}
              >
                <div className="p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      Panduan Lengkap
                    </h2>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Ikuti langkah-langkah berikut untuk mendapatkan data
                      Instagram dan mengetahui siapa yang tidak followback Anda.
                    </p>
                  </motion.div>

                  <div className="space-y-8">
                    {/* Step 1 */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            darkMode ? "bg-blue-600" : "bg-blue-500"
                          }`}
                        >
                          1
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Minta Data Instagram Anda
                        </h3>
                        <div
                          className={`p-4 rounded-xl mb-4 ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                        >
                          <ol
                            className={`list-decimal list-inside space-y-2 ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <li>Buka aplikasi Instagram di ponsel Anda</li>
                            <li>
                              Buka profil Anda dan ketuk menu hamburger (≡) di
                              kanan atas
                            </li>
                            <li>
                              Pilih <strong>Pengaturan dan privasi</strong>
                            </li>
                            <li>
                              Scroll ke bawah dan pilih{" "}
                              <strong>Pusat Akun</strong>
                            </li>
                            <li>
                              Tap{" "}
                              <strong>Informasi pribadi Anda dan izin</strong>
                            </li>
                            <li>
                              Pilih <strong>Unduh informasi Anda</strong>
                            </li>
                            <li>
                              Pilih format <strong>JSON</strong> dan tap{" "}
                              <strong>Kirim permintaan</strong>
                            </li>
                          </ol>
                        </div>
                        <div
                          className={`flex items-start gap-3 p-4 rounded-xl ${
                            darkMode
                              ? "bg-blue-900/20 border border-blue-800/30"
                              : "bg-blue-50 border border-blue-100"
                          }`}
                        >
                          <div className="flex-shrink-0 text-blue-500">
                            <InfoIcon size={20} />
                          </div>
                          <p className="text-sm">
                            Instagram akan memproses permintaan Anda dalam
                            beberapa hari. Anda akan mendapatkan notifikasi dan
                            email saat data siap untuk diunduh.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            darkMode ? "bg-blue-600" : "bg-blue-500"
                          }`}
                        >
                          2
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Unduh Data Anda
                        </h3>
                        <div
                          className={`p-4 rounded-xl mb-4 ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                        >
                          <ol
                            className={`list-decimal list-inside space-y-2 ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <li>
                              Setelah menerima notifikasi, buka kembali menu{" "}
                              <strong>Unduh informasi Anda</strong>
                            </li>
                            <li>
                              Anda akan melihat file ZIP yang siap diunduh
                            </li>
                            <li>
                              Klik tombol <strong>Unduh</strong>
                            </li>
                            <li>File akan tersimpan di perangkat Anda</li>
                          </ol>
                        </div>
                        <div
                          className={`flex items-start gap-3 p-4 rounded-xl ${
                            darkMode
                              ? "bg-yellow-900/20 border border-yellow-800/30"
                              : "bg-yellow-50 border border-yellow-100"
                          }`}
                        >
                          <div className="flex-shrink-0 text-yellow-500">
                            <AlertTriangle size={20} />
                          </div>
                          <p className="text-sm">
                            Pastikan Anda mengunduh file dalam format{" "}
                            <strong>JSON</strong>. Format HTML tidak akan
                            berfungsi dengan aplikasi ini.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            darkMode ? "bg-blue-600" : "bg-blue-500"
                          }`}
                        >
                          3
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Upload File ke Impostorgram
                        </h3>
                        <div
                          className={`p-4 rounded-xl mb-4 ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                        >
                          <ol
                            className={`list-decimal list-inside space-y-2 ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <li>Kembali ke halaman utama Impostorgram</li>
                            <li>
                              Klik area upload atau drag-and-drop file ZIP
                              Instagram Anda
                            </li>
                            <li>
                              Klik tombol <strong>Analisis Sekarang</strong>
                            </li>
                            <li>Tunggu proses analisis selesai</li>
                          </ol>
                        </div>
                        <div
                          className={`flex items-start gap-3 p-4 rounded-xl ${
                            darkMode
                              ? "bg-green-900/20 border border-green-800/30"
                              : "bg-green-50 border border-green-100"
                          }`}
                        >
                          <div className="flex-shrink-0 text-green-500">
                            <Shield size={20} />
                          </div>
                          <p className="text-sm">
                            Data Anda 100% aman. Semua proses analisis dilakukan
                            di perangkat Anda dan tidak ada data yang dikirim ke
                            server.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-12"
                    >
                      <h3 className="text-2xl font-bold mb-6">
                        Pertanyaan Umum
                      </h3>

                      <div className="space-y-4">
                        {[
                          {
                            question: "Apakah aplikasi ini aman?",
                            answer:
                              "Ya, 100% aman. Semua analisis dilakukan di browser Anda (client-side). Kami tidak menyimpan data Anda di server kami dan tidak ada data yang dikirim keluar.",
                          },
                          {
                            question: "Berapa lama proses analisis?",
                            answer:
                              "Proses analisis biasanya hanya membutuhkan waktu beberapa detik, tergantung pada ukuran file dan jumlah following/followers Anda.",
                          },
                          {
                            question: "Apakah saya perlu login Instagram?",
                            answer:
                              "Tidak. Aplikasi ini hanya membutuhkan file data yang Anda unduh dari Instagram, bukan akses langsung ke akun Anda.",
                          },
                          {
                            question: "Format file apa yang didukung?",
                            answer:
                              "Hanya format ZIP dari data Instagram dalam format JSON yang didukung. File HTML tidak akan berfungsi dengan aplikasi ini.",
                          },
                          {
                            question: "Informasi apa yang bisa saya lihat?",
                            answer:
                              "Anda bisa melihat daftar akun yang Anda follow tetapi tidak membalas follow Anda (tidak followback).",
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.01 }}
                            className={`p-4 rounded-xl border ${
                              darkMode
                                ? "border-gray-700 bg-gray-800/50"
                                : "border-gray-200 bg-gray-50"
                            }`}
                          >
                            <h4 className="font-bold mb-2">{item.question}</h4>
                            <p
                              className={
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {item.answer}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Return to Home Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex justify-center mt-8"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage("home")}
                        className={`px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 ${
                          darkMode
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : "bg-blue-500 hover:bg-blue-400 text-white"
                        }`}
                      >
                        <ChevronRight size={20} />
                        <span>Kembali ke Analisis</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className={`mt-auto py-6 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Instagram size={20} className="text-blue-500" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Users size={20} className="text-purple-500" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <UserCheck size={20} className="text-green-500" />
            </motion.div>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Impostorgram | Analisis Follower
            Instagram
          </p>
          <p className="text-xs mt-2">
            Dibuat untuk kebutuhan personal. Tidak terafiliasi dengan Instagram.
          </p>
        </div>
      </footer>
    </div>
  );
}
