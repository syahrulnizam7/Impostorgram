"use client";

import { useState, useEffect } from "react";
import { IoMdMoon, IoMdSunny, IoMdArrowRoundBack } from "react-icons/io";
import { PiDetectiveFill } from "react-icons/pi";
import {
  FiDownload,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiSettings,
} from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Panduan() {
  const [darkMode, setDarkMode] = useState(true);

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

  const steps = [
    {
      title: "Buka Pusat Akun",
      description:
        "Buka aplikasi Instagram, masuk ke profil, dan pilih Opsi Lainnya (ikon tiga garis) lalu pilih Buka pusat akun",
      icon: <FiSettings />,
    },
    {
      title: "Akses Data dan Izin",
      description:
        "Pilih Informasi dan izin anda kemudian pilih Unduh informasi anda.",
      icon: <FiFileText />,
    },
    {
      title: "Pilih Metode Unduh",
      description:
        "Pilih Mengunduh atau mentransfer informasi dan pilih akun anda.",
      icon: <FiDownload />,
    },
    {
      title: "Pilih Data yang Diperlukan",
      description:
        "Pilih Beberapa informasi anda. Pada bagian Koneksi, pilih Pengikut dan mengikuti.",
      icon: <FiCheckCircle />,
    },
    {
      title: "Atur Format dan Periode",
      description:
        "Pilih Unduh ke perangkat, atur tanggal ke Sepanjang waktu, dan pilih format JSON.",
      icon: <FiCalendar />,
    },
    {
      title: "Buat File dan Tunggu",
      description:
        "Pilih Buat file dan tunggu proses request. Biasanya membutuhkan waktu 1-3 hari hingga file ZIP siap diunduh.",
      icon: <FiDownload />,
    },
  ];

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
            href="/"
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            <IoMdArrowRoundBack className="mr-2" />
            Kembali
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
          } p-8`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Panduan Penggunaan ImpostorGram
            </h1>
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Ikuti langkah-langkah di bawah untuk mendapatkan data Instagram
              kamu dan menggunakan ImpostorGram.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <div
              className={`p-4 rounded-lg ${
                darkMode
                  ? "bg-yellow-500/10 border border-yellow-500/30"
                  : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    darkMode ? "bg-yellow-500/20" : "bg-yellow-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg text-yellow-500">
                    Perhatian!
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Proses ini 100% aman karena data diproses sepenuhnya di
                    browser Anda. File tidak pernah dikirim ke server mana pun.
                    Instagram memerlukan waktu 1-3 hari untuk menyiapkan data
                    Anda.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-purple-500"></div>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-0 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <div
                      className={`p-5 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <span
                          className={`mr-2 text-lg ${
                            darkMode ? "text-pink-400" : "text-pink-500"
                          }`}
                        >
                          {step.icon}
                        </span>
                        <h3 className="font-bold text-lg">{step.title}</h3>
                      </div>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: steps.length * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                    {steps.length + 1}
                  </div>
                  <div
                    className={`p-5 rounded-lg ${
                      darkMode
                        ? "bg-green-500/10 border border-green-500/30"
                        : "bg-green-50 border border-green-100"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span
                        className={`mr-2 text-lg ${
                          darkMode ? "text-green-400" : "text-green-500"
                        }`}
                      >
                        <FiCheckCircle />
                      </span>
                      <h3 className="font-bold text-lg">
                        Upload ke ImpostorGram
                      </h3>
                    </div>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Setelah menerima file ZIP dari Instagram, unggah file
                      tersebut ke ImpostorGram dan temukan siapa saja yang tidak
                      follow back akun Anda!
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:from-pink-600 hover:to-purple-600 transition-all shadow hover:shadow-pink-500/20"
                      >
                        <PiDetectiveFill className="mr-2" />
                        Mulai Gunakan ImpostorGram
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
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
