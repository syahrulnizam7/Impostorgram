"use client";

import { useState, useEffect, useRef } from "react";
import JSZip from "jszip";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Docs from "./components/Docs";

export default function Main() {
  const [file, setFile] = useState<File | null>(null);
  const [notFollowback, setNotFollowback] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState<"home" | "docs">("home");
  const [fileName, setFileName] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    // Cek tema yang dipakai user
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      setDarkMode(false);
    }

    // inisialisasi animasi
    setAnimateHero(true);
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

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

      <Header
        darkMode={darkMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setDarkMode={setDarkMode}
      />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <AnimatePresence mode="wait">
          {currentPage === "home" ? (
            <Home
              darkMode={darkMode}
              file={file}
              fileName={fileName}
              isProcessing={isProcessing}
              processingStep={processingStep}
              notFollowback={notFollowback}
              handleFileChange={handleFileChange}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              processZip={processZip}
              setCurrentPage={setCurrentPage}
              fileInputRef={fileInputRef}
              controls={controls}
              setFile={setFile}
              setFileName={setFileName}
            />
          ) : (
            <Docs darkMode={darkMode} setCurrentPage={setCurrentPage} />
          )}
        </AnimatePresence>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
