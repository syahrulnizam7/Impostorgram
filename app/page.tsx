"use client";

import { useState, useEffect } from "react";
import JSZip from "jszip";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FiUpload, FiInfo, FiUser, FiUsers, FiUserCheck } from "react-icons/fi";
import { PiDetectiveFill } from "react-icons/pi";
import { RiFileZipLine } from "react-icons/ri";
import Link from "next/link";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [notFollowback, setNotFollowback] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  const processingSteps = [
    "Membuka file...",
    "Membaca followers...",
    "Membaca following...",
    "Menganalisis data...",
  ];

  useEffect(() => {
    // Set initial theme based on user preference
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);

    // Apply theme class to document
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setNotFollowback([]);
    }
  };

  const processZip = async () => {
    if (!file) {
      alert("Pilih file ZIP terlebih dahulu!");
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);
    setNotFollowback([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async function (event) {
      if (!event.target?.result) {
        setIsProcessing(false);
        return;
      }

      try {
        // Step 1: Open file
        const zip = await JSZip.loadAsync(event.target.result as ArrayBuffer);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProcessingStep(1);

        // Step 2: Read followers
        let followers: string[] = [];
        let index = 1;

        while (
          zip.file(
            `connections/followers_and_following/followers_${index}.json`
          )
        ) {
          const content = await zip
            .file(`connections/followers_and_following/followers_${index}.json`)
            ?.async("string");

          if (content) {
            const parsedData = JSON.parse(content);
            followers = followers.concat(
              parsedData.map(
                (user: { string_list_data: { value: string }[] }) =>
                  user.string_list_data[0].value
              )
            );
          }
          index++;
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProcessingStep(2);

        // Step 3: Read following
        const followingFile =
          "connections/followers_and_following/following.json";

        if (!zip.file(followingFile)) {
          alert("File following.json tidak ditemukan dalam ZIP");
          setIsProcessing(false);
          return;
        }

        const followingContent = await zip.file(followingFile)?.async("string");

        if (!followingContent) {
          setIsProcessing(false);
          return;
        }

        const followingData =
          JSON.parse(followingContent)["relationships_following"];
        const following = followingData.map(
          (user: { string_list_data: { value: string }[] }) =>
            user.string_list_data[0].value
        );
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProcessingStep(3);

        // Step 4: Analyze data
        const notFollowbackUsers = following.filter(
          (user: string) => !followers.includes(user)
        );
        await new Promise((resolve) => setTimeout(resolve, 800));

        setNotFollowback(notFollowbackUsers);
        setIsProcessing(false);
      } catch (error) {
        console.error("Error processing ZIP file:", error);
        alert(
          "Terjadi kesalahan saat memproses file ZIP. Pastikan format file benar."
        );
        setIsProcessing(false);
      }
    };

    reader.onerror = function () {
      alert("Terjadi kesalahan saat membaca file.");
      setIsProcessing(false);
    };
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Navigation Bar */}
      <nav
        className={`py-4 px-6 flex justify-between items-center shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center">
          <PiDetectiveFill className="text-2xl text-pink-500 mr-2" />
          <h1 className="text-xl font-bold">ImpostorGram</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/Panduan"
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            <FiInfo className="mr-2" />
            Panduan
          </Link>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors duration-200`}
            aria-label="Toggle theme"
          >
            {darkMode ? <IoMdSunny /> : <IoMdMoon />}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-xl shadow-xl overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <PiDetectiveFill className="text-pink-500 mr-2" />
                ImpostorGram
              </h1>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } max-w-2xl mx-auto`}
              >
                Temukan siapa yang tidak follow back akun Instagram kamu! Tidak
                yakin cara mendapatkan data Instagram? Kunjungi{" "}
                <Link
                  href="/Panduan"
                  className="text-pink-500 hover:text-pink-400 underline"
                >
                  panduan
                </Link>
                .
              </p>
            </div>

            <div
              className={`p-8 rounded-lg mb-6 border-2 border-dashed transition-all ${
                file
                  ? `${
                      darkMode
                        ? "border-green-500 bg-green-500/10"
                        : "border-green-500 bg-green-500/10"
                    }`
                  : `${
                      darkMode
                        ? "border-gray-600 hover:border-pink-500"
                        : "border-gray-300 hover:border-pink-500"
                    }`
              }`}
            >
              <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {file ? (
                  <>
                    <RiFileZipLine className="text-4xl mb-3 text-green-500" />
                    <p className="font-medium">{file.name}</p>
                    <p
                      className={`text-sm mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Klik untuk
                      mengganti
                    </p>
                  </>
                ) : (
                  <>
                    <FiUpload className="text-4xl mb-3 text-pink-500" />
                    <p className="font-medium">
                      Upload file ZIP Instagram kamu
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Klik di sini atau drag & drop file
                    </p>
                  </>
                )}
              </label>
            </div>

            <button
              onClick={processZip}
              className={`w-full py-3 px-4 rounded-lg font-medium relative overflow-hidden transition-all ${
                file
                  ? "bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-pink-500/20"
                  : `${
                      darkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-200 text-gray-500"
                    }`
              } ${isProcessing ? "cursor-not-allowed" : "cursor-pointer"}`}
              disabled={!file || isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
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
                  {processingSteps[processingStep]}
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FiUserCheck className="mr-2" />
                  Cek Who's Not Following Back
                </span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {notFollowback.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`border-t ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <FiUsers className="mr-2 text-red-500" />
                      Impostor Ditemukan!
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode
                          ? "bg-red-500/20 text-red-400"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {notFollowback.length} akun
                    </span>
                  </div>

                  <div
                    className={`rounded-lg ${
                      darkMode ? "bg-gray-700/50" : "bg-gray-50"
                    } p-4 max-h-96 overflow-y-auto`}
                  >
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {notFollowback.map((user, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className={`group p-3 rounded-lg transition-all ${
                            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                          }`}
                        >
                          <a
                            href={`https://instagram.com/${user}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                darkMode
                                  ? "bg-gray-600 group-hover:bg-pink-500/20"
                                  : "bg-gray-200 group-hover:bg-pink-500/20"
                              }`}
                            >
                              <FiUser className="text-pink-500" />
                            </div>
                            <span className="flex-grow font-medium">
                              {user}
                            </span>
                            <FaInstagram
                              className={`text-lg ${
                                darkMode
                                  ? "text-gray-500 group-hover:text-pink-400"
                                  : "text-gray-400 group-hover:text-pink-500"
                              } transition-colors`}
                            />
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer
        className={`py-6 px-6 text-center ${
          darkMode ? "text-gray-400" : "text-gray-500"
        } text-sm`}
      >
        <p>
          ImpostorGram © {new Date().getFullYear()} | 100% Aman | Data Diproses
          pada Browser
        </p>
      </footer>
    </div>
  );
}
