import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Globe,
  Clock,
  FileJson,
  Download,
  InfoIcon,
  AlertTriangle,
  Instagram,
  ChevronRight,
  Sparkles,
  UserX,
} from "lucide-react";

interface HomeProps {
  darkMode: boolean;
  file: File | null;
  fileName: string;
  isProcessing: boolean;
  processingStep: number;
  notFollowback: string[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  processZip: () => void;
  setCurrentPage: (page: "home" | "docs") => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  controls: any;
  setFile: (file: File | null) => void;
  setFileName: (fileName: string) => void;
}

export default function Home({
  darkMode,
  file,
  fileName,
  isProcessing,
  processingStep,
  notFollowback,
  handleFileChange,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  processZip,
  setCurrentPage,
  fileInputRef,
  controls,
  setFile,
  setFileName,
}: HomeProps) {
  const processingSteps = [
    "Membuka file...",
    "Membaca followers...",
    "Membaca following...",
    "Menganalisis data...",
  ];

  // Calculate progress percentage based on processingStep
  const progressPercentage = isProcessing
    ? ((processingStep + 1) / processingSteps.length) * 100
    : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const shimmerEffect = {
    hidden: { backgroundPosition: "0% 0%" },
    visible: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center relative z-10"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className={`absolute -top-64 -right-64 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? "bg-purple-700/20" : "bg-purple-500/10"
          }`}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.3 }}
          className={`absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl ${
            darkMode ? "bg-blue-700/20" : "bg-blue-500/10"
          }`}
        />
      </div>
      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-center mb-12 relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-32 h-32 rounded-full blur-3xl ${
            darkMode
              ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30"
              : "bg-gradient-to-r from-blue-300/30 to-purple-300/30"
          }`}
        />

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 mb-4"
        >
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-blue-500/20" : "bg-blue-100"
            }`}
          >
            <Instagram size={20} className="text-blue-500" />
          </div>
          <span
            className={`text-sm font-medium ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Instagram Analyzer
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          <motion.span
            variants={shimmerEffect}
            animate="visible"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-size-200"
          >
            Temukan Impostor
          </motion.span>{" "}
          <span className={darkMode ? "text-white" : "text-gray-800"}>
            di Instagram<span className="text-pink-500">.</span>
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className={`text-lg md:text-xl max-w-3xl mx-auto ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          "Cek siapa saja yang tidak nge-follow balik akun Instagram kamu"
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: <Shield size={20} />, text: "100% Aman & Privat" },
            { icon: <Globe size={20} />, text: "Analisis Lokal" },
            { icon: <Clock size={20} />, text: "Proses Cepat" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ y: 0, scale: 0.95 }}
              className={`flex items-center px-5 py-2.5 rounded-full shadow-sm ${
                darkMode
                  ? "bg-gray-800/80 border border-gray-700 hover:bg-gray-700/80"
                  : "bg-white/80 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2 text-blue-500">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {/* Main Card with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`w-full max-w-2xl rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl 
        ${
          darkMode
            ? "bg-gray-900/70 border border-gray-800 shadow-blue-500/10"
            : "bg-white/90 border border-gray-100 shadow-gray-300/30"
        }`}
      >
        <div className="p-8">
          {/* File Upload Section */}
          <motion.div
            className={`relative mb-8 border-2 border-dashed rounded-2xl transition-all duration-300
            ${
              file
                ? darkMode
                  ? "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/10"
                  : "border-blue-400 bg-blue-50/50 shadow-lg shadow-blue-300/10"
                : darkMode
                ? "border-gray-700 hover:border-gray-500"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
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

            <div className="flex flex-col items-center text-center p-8">
              <motion.div
                className={`w-24 h-24 flex items-center justify-center rounded-2xl mb-6 shadow-md
                ${
                  file
                    ? darkMode
                      ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-500/40"
                      : "bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200"
                    : darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-gray-100 border border-gray-200"
                }`}
                initial={{ rotate: 0 }}
                animate={
                  file ? { rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] } : {}
                }
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {file ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 360] }}
                    transition={{ type: "spring", duration: 0.7 }}
                  >
                    <FileJson size={40} className="text-blue-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Download
                      size={40}
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    />
                  </motion.div>
                )}
              </motion.div>

              <motion.h3
                className="text-2xl font-bold mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {file ? (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={18} className="text-yellow-500" />
                    File Siap Dianalisis
                    <Sparkles size={18} className="text-yellow-500" />
                  </span>
                ) : (
                  "Upload File Instagram"
                )}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-sm mb-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {fileName
                  ? fileName
                  : "Drag & drop file ZIP Instagram atau klik untuk memilih"}
              </motion.p>

              {!file && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`text-xs ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Format: .zip dari data Instagram yang diunduh
                </motion.p>
              )}

              {file && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFile(null);
                    setFileName("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className={`mt-4 px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                      : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
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
            transition={{ delay: 0.5 }}
            className={`flex items-start gap-4 p-5 rounded-2xl mb-8 ${
              darkMode
                ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
            }`}
          >
            <div
              className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center shadow-sm ${
                darkMode
                  ? "bg-blue-500/20 border border-blue-500/30"
                  : "bg-blue-100 border border-blue-200"
              }`}
            >
              <InfoIcon className="text-blue-500" size={24} />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-lg">
                Tidak tahu cara mendapatkan data?
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Lihat panduan lengkap untuk mendapatkan file ZIP data Instagram
                Anda di halaman
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage("docs")}
                  className="ml-1 font-medium text-blue-500 hover:underline inline-flex items-center"
                >
                  Panduan
                  <ChevronRight size={16} className="ml-1" />
                </motion.button>
              </p>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div className="relative">
            <motion.button
              whileHover={file && !isProcessing ? { scale: 1.02, y: -2 } : {}}
              whileTap={file && !isProcessing ? { scale: 0.98 } : {}}
              onClick={processZip}
              disabled={!file || isProcessing}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white flex items-center justify-center relative overflow-hidden transition-all duration-300
                ${
                  file && !isProcessing
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                    : "bg-gray-500 bg-opacity-20 cursor-not-allowed"
                }
              `}
            >
              {isProcessing ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
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
                  {/* Progress bar */}
                  <div className="w-full bg-blue-900/30 rounded-full h-1.5 mt-1">
                    <motion.div
                      className="bg-blue-300 h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <span className="relative z-10 flex items-center">
                    {file ? (
                      <>
                        <UserX size={18} className="mr-2" />
                        Analisis Sekarang
                      </>
                    ) : (
                      "Pilih File Terlebih Dahulu"
                    )}
                  </span>
                  {file && (
                    <>
                      {/* Button highlight effect */}
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"
                      />
                      <motion.span
                        animate={{
                          x: [0, 100, 0],
                          opacity: [0, 0.15, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                        className="absolute top-0 bottom-0 left-0 w-20 bg-white/10 skew-x-12 z-0"
                      />
                    </>
                  )}
                </>
              )}
            </motion.button>

            {/* Decorative elements */}
            {file && !isProcessing && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-blue-500/30 blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -left-2 -bottom-2 w-4 h-4 rounded-full bg-purple-500/30 blur-sm"
                />
              </>
            )}
          </motion.div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {notFollowback.length > 0 && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`border-t ${
                darkMode ? "border-gray-800" : "border-gray-200"
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
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 shadow-md
                    ${
                      darkMode
                        ? "bg-gradient-to-br from-yellow-500/20 to-red-500/20 border border-yellow-500/30"
                        : "bg-gradient-to-br from-yellow-100 to-red-100 border border-yellow-200"
                    }`}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    >
                      <AlertTriangle className="text-yellow-500" size={28} />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
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
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className={`ml-auto px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1
                    ${
                      darkMode
                        ? "bg-gradient-to-r from-yellow-500/20 to-red-500/20 text-yellow-300 border border-yellow-500/30"
                        : "bg-gradient-to-r from-yellow-100 to-red-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    <UserX size={14} />
                    {notFollowback.length}
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`rounded-2xl overflow-hidden shadow-lg ${
                    darkMode
                      ? "bg-gray-900/70 border border-gray-800"
                      : "bg-white/90 border border-gray-200"
                  }`}
                >
                  <div
                    className={`px-5 py-4 ${
                      darkMode ? "bg-gray-800" : "bg-gray-50"
                    } flex items-center justify-between`}
                  >
                    <div className="flex items-center">
                      <Instagram size={18} className="mr-2 text-blue-500" />
                      <span className="font-medium">Instagram Username</span>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      Klik untuk lihat profil
                    </span>
                  </div>

                  <div className="overflow-y-auto max-h-96 p-3">
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
                          scale: 1.02,
                          x: 5,
                          backgroundColor: darkMode
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgba(59, 130, 246, 0.05)",
                        }}
                        className={`flex items-center p-4 mb-2 rounded-xl transition-all duration-200 ${
                          darkMode
                            ? "hover:bg-blue-900/20 border border-gray-800 hover:border-blue-800/30"
                            : "hover:bg-blue-50 border border-gray-100 hover:border-blue-200"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-xl mr-4 shadow-sm
                          ${
                            darkMode
                              ? "bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-gray-700"
                              : "bg-gradient-to-br from-purple-100 to-blue-100 border border-gray-200"
                          }`}
                        >
                          <Instagram size={20} className="text-blue-500" />
                        </div>
                        <span className="flex-grow font-medium">{user}</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-gray-800 text-gray-400"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <span>Lihat</span>
                          <ChevronRight size={14} />
                        </motion.div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 flex justify-between items-center"
                >
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {notFollowback.length} akun tidak follow-back Anda
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
