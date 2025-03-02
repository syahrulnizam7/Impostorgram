import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import { Righteous } from "next/font/google";

const righteous = Righteous({
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when page changes
  const handlePageChange = (page: "home" | "docs") => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        scrolled ? "py-2 shadow-lg" : "py-4"
      } ${
        darkMode
          ? "bg-gray-900/90 backdrop-blur-lg border-b border-gray-800"
          : "bg-white/90 backdrop-blur-lg border-b border-gray-200"
      }`}
    >
      <div className=" mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => handlePageChange("home")}
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
              className="mr-2 -ml-6"
            />
            <span className={righteous.className}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Impostor
              </span>
              <span className={darkMode ? "text-white" : "text-gray-800"}>
                gram
              </span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage("home")}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                currentPage === "home"
                  ? darkMode
                    ? "bg-blue-600 shadow-lg shadow-blue-500/30 text-white"
                    : "bg-blue-500 shadow-lg shadow-blue-500/20 text-white"
                  : `hover:bg-opacity-20 ${
                      darkMode
                        ? "hover:bg-gray-500 text-gray-200"
                        : "hover:bg-gray-200 text-gray-800"
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
                    ? "bg-blue-600 shadow-lg shadow-blue-500/30 text-white"
                    : "bg-blue-500 shadow-lg shadow-blue-500/20 text-white"
                  : `hover:bg-opacity-20 ${
                      darkMode
                        ? "hover:bg-gray-500 text-gray-200"
                        : "hover:bg-gray-200 text-gray-800"
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? "dark" : "light"}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? (
                    <Sun size={20} className="text-yellow-400" />
                  ) : (
                    <Moon size={20} className="text-blue-500" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`mr-2 p-2 rounded-full transition-all ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? "dark" : "light"}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? (
                    <Sun size={20} className="text-yellow-400" />
                  ) : (
                    <Moon size={20} className="text-blue-500" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "open" : "closed"}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: isMenuOpen ? 90 : 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="container mx-auto px-4 py-3 space-y-2">
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => handlePageChange("home")}
                className={`w-full text-left px-3 py-3 rounded-lg font-medium ${
                  currentPage === "home"
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : `${
                        darkMode
                          ? "text-gray-200 hover:bg-gray-700"
                          : "text-gray-800 hover:bg-gray-100"
                      }`
                }`}
              >
                Home
              </motion.button>

              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => handlePageChange("docs")}
                className={`w-full text-left px-3 py-3 rounded-lg font-medium ${
                  currentPage === "docs"
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : `${
                        darkMode
                          ? "text-gray-200 hover:bg-gray-700"
                          : "text-gray-800 hover:bg-gray-100"
                      }`
                }`}
              >
                Panduan
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
