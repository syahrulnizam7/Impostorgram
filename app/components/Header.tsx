import { motion } from "framer-motion";
import { Zap, Sun, Moon } from "lucide-react";

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
  return (
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
  );
}
