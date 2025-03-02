import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import { Righteous } from "next/font/google";

const specialElite = Righteous({
  subsets: ["latin"],
  weight: "400",
});

interface HeaderProps {
  darkMode: boolean;
  currentPage: "home" | "docs";
  setCurrentPage: (page: "home" | "docs") => void;
  setDarkMode: (darkMode: boolean) => void;
}

export default function Header({
  darkMode,
  currentPage,
  setCurrentPage,
  setDarkMode,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/90 border-b border-gray-800"
          : "bg-white/90 border-b border-gray-200"
      } backdrop-blur-lg`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold flex items-center "
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
          <Image
            src="/images/impostorgram.png"
            alt="Impostorgram Logo"
            width={30}
            height={30}
            className="mr-2"
          />
          <span className={specialElite.className}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Impostor
            </span>
            <span className={darkMode ? "text-white" : "text-gray-800"}>
              gram
            </span>
          </span>
        </motion.h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {["home", "docs"].map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(page as "home" | "docs")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? darkMode
                    ? "bg-blue-600 shadow-lg shadow-blue-500/30"
                    : "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : `hover:bg-opacity-20 ${
                      darkMode ? "hover:bg-gray-500" : "hover:bg-gray-200"
                    }`
              }`}
            >
              {page === "home" ? "Home" : "Panduan"}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all ${
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`${
              darkMode ? "bg-gray-900" : "bg-white"
            } md:hidden py-4 px-6 space-y-3 shadow-lg`}
          >
            {["home", "docs"].map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentPage(page as "home" | "docs");
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : `hover:bg-opacity-20 ${
                        darkMode ? "hover:bg-gray-500" : "hover:bg-gray-200"
                      }`
                }`}
              >
                {page === "home" ? "Home" : "Panduan"}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center w-full px-4 py-2 rounded-lg font-medium transition-all"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400 mr-2" />
              ) : (
                <Moon size={20} className="text-blue-500 mr-2" />
              )}
              {darkMode ? "Mode Terang" : "Mode Gelap"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
