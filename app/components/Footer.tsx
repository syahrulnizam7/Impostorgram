import { motion } from "framer-motion";
import { Instagram, Users, UserCheck } from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  return (
    <footer
      className={`mt-auto py-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Icons Section */}
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

        {/* Copyright Text */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Impostorgram | Analisis Follower
          Instagram
        </p>

        {/* Disclaimer Text */}
        <p className="text-xs mt-2">
          Dibuat untuk kebutuhan personal. Tidak terafiliasi dengan Instagram.
        </p>

        {/* "by Alangkun" with Link */}
        <motion.a
          href="https://syahrul-nizam.my.id"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className={`inline-block mt-4 text-sm font-medium ${
            darkMode
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
          }`}
        >
          by Alangkun
        </motion.a>
      </div>
    </footer>
  );
}
