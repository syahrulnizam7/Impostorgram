import { motion } from "framer-motion";
import {
  InfoIcon,
  AlertTriangle,
  Shield,
  ArrowLeft,
  Zap,
  Users,
} from "lucide-react";
import Image from "next/image";

interface DocsProps {
  darkMode: boolean;
  setCurrentPage: (page: "home" | "docs") => void;
}

export default function Docs({ darkMode, setCurrentPage }: DocsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stepIconColors = [
    "from-blue-500 to-purple-500",
    "from-pink-500 to-orange-500",
    "from-green-500 to-teal-500",
  ];

  return (
    <motion.div
      key="docs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      {/* Documentation Page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`rounded-3xl overflow-hidden backdrop-blur-lg shadow-2xl ${
          darkMode
            ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 shadow-blue-500/10"
            : "bg-gradient-to-br from-white/90 to-gray-50/90 border border-gray-200/50 shadow-gray-300/30"
        }`}
      >
        <div
          className={`h-2 ${
            darkMode
              ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          }`}
        />

        <div className="p-4 md:p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 md:mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Panduan Lengkap
            </h2>
            <p
              className={`max-w-3xl mx-auto text-base md:text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Ikuti langkah-langkah berikut untuk mendapatkan data Instagram dan
              mengetahui siapa yang tidak followback Anda.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 md:space-y-12"
          >
            {/* Step 1 */}
            <motion.div variants={cardVariants} className="group">
              <div
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/70 hover:bg-gray-800/90 border border-gray-700/50 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/10"
                    : "bg-white/80 hover:bg-white/95 border border-gray-200/50 hover:border-blue-300/70 shadow-lg hover:shadow-blue-300/20"
                }`}
              >
                <div
                  className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stepIconColors[0]}`}
                ></div>
                <div className="p-4 md:p-8">
                  <div className="flex flex-col">
                    <div className="flex md:items-start gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center text-white font-bold relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${stepIconColors[0]}`}
                          ></div>
                          <div className="relative flex flex-col items-center">
                            <span className="text-xl md:text-2xl">1</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4 flex items-center">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Minta Data Instagram Anda
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div
                      className={`p-4 md:p-6 rounded-xl mb-4 md:mb-6 md:ml-20 transform transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-900/60 hover:bg-gray-900/80 hover:shadow-md"
                          : "bg-gray-50 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <ol
                        className={`list-decimal list-inside space-y-2 md:space-y-3 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <li className="pb-1 md:pb-2">
                          Buka aplikasi Instagram di ponsel Anda
                        </li>
                        <li className="pb-1 md:pb-2">
                          Buka profil Anda dan ketuk menu hamburger (≡) di kanan
                          atas
                        </li>
                        <li className="pb-1 md:pb-2">
                          Pilih <strong>Pusat Akun</strong>
                          <div className="mt-2 justify-center flex">
                            <Image
                              src="/images/step3.jpg"
                              alt="Pilih Pusat Akun"
                              width={270}
                              height={150}
                              className="rounded-lg  lg:w-96"
                            />
                          </div>
                        </li>
                        <li className="pb-1 md:pb-2">
                          Tap <strong>Informasi dan izin Anda</strong>
                          <div className="mt-2 justify-center flex">
                            <Image
                              src="/images/step4.jpg"
                              alt="Pilih Pusat Akun"
                              width={270}
                              height={150}
                              className="rounded-lg lg:w-96"
                            />
                          </div>
                        </li>
                        <li className="pb-1 md:pb-2">
                          Pilih <strong>Unduh informasi Anda</strong>
                          <div className="mt-2 justify-center flex">
                            <Image
                              src="/images/step5.jpg"
                              alt="Pilih Pusat Akun"
                              width={270}
                              height={150}
                              className="rounded-lg lg:w-96"
                            />
                          </div>
                        </li>
                        <li className="pb-1 md:pb-2">
                          Pilih{" "}
                          <strong>Mengunduh atau mentransfer informasi</strong>
                          <div className="mt-2 justify-center flex">
                            <Image
                              src="/images/step6.jpg"
                              alt="Pilih Pusat Akun"
                              width={270}
                              height={150}
                              className="rounded-lg lg:w-96"
                            />
                          </div>
                        </li>
                        <li className="pb-1 md:pb-2">
                          Centang akun anda dan pilih berikutnya{" "}
                        </li>
                        <li>
                          Pilih <strong>Beberapa informasi Anda</strong> dan
                          centang <strong>Pengikut dan mengikuti</strong>
                          <div className="mt-2 justify-center items-center gap-2 flex flex-col ">
                            <Image
                              src="/images/step8-1.jpg"
                              alt="Pilih Pusat Akun"
                              width={270}
                              height={150}
                              className="rounded-lg lg:w-96"
                            />
                            <Image
                              src="/images/step8-2.jpg"
                              alt="Pilih Pusat Akun"
                              width={270}
                              height={150}
                              className="rounded-lg lg:w-96"
                            />
                          </div>
                        </li>
                        <li>
                          Pilih <strong>Unduh ke perangkat</strong>
                          <div className="mt-2 justify-center flex">
                            <Image
                              src="/images/step9.jpg"
                              alt="Pilih Pusat Akun"
                              width={270}
                              height={150}
                              className="rounded-lg lg:w-96"
                            />
                          </div>
                        </li>
                        <li>
                          Atur rentang tanggal ke{" "}
                          <strong> Sepanjang waktu</strong>, dan format{" "}
                          <strong>JSON</strong>
                          <div className="mt-2 justify-center flex">
                            <Image
                              src="/images/step10.jpg"
                              alt="Pilih Pusat Akun"
                              width={270}
                              height={150}
                              className="rounded-lg lg:w-96"
                            />
                          </div>
                        </li>
                        <li>
                          Dan terakhir tap <strong>Buat File</strong>
                        </li>
                      </ol>
                    </div>
                    <div
                      className={`flex md:ml-20 items-start gap-4 p-4 md:p-6 rounded-xl transform transition-all duration-300 ${
                        darkMode
                          ? "bg-blue-900/30 border border-blue-800/40 hover:bg-blue-900/40 hover:border-blue-700/50"
                          : "bg-blue-50 border border-blue-100 hover:bg-blue-100/80 hover:border-blue-200"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 p-2 md:p-3 rounded-full ${
                          darkMode ? "bg-blue-900/60" : "bg-blue-100"
                        }`}
                      >
                        <InfoIcon size={18} className="text-blue-500" />
                      </div>
                      <p className="text-sm md:text-base">
                        Instagram akan memproses permintaan Anda dalam beberapa
                        hari. Anda akan mendapatkan notifikasi dan email saat
                        data siap untuk diunduh.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={cardVariants} className="group">
              <div
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/70 hover:bg-gray-800/90 border border-gray-700/50 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/10"
                    : "bg-white/80 hover:bg-white/95 border border-gray-200/50 hover:border-pink-300/70 shadow-lg hover:shadow-pink-300/20"
                }`}
              >
                <div
                  className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stepIconColors[1]}`}
                ></div>
                <div className="p-4 md:p-8">
                  <div className="flex flex-col">
                    <div className="flex md:items-start gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center text-white font-bold relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${stepIconColors[1]}`}
                          ></div>
                          <div className="relative flex flex-col items-center">
                            <span className="text-xl md:text-2xl">2</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4 flex items-center">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">
                            Unduh Data Anda
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div
                      className={`p-4 md:p-6 rounded-xl mb-4 md:mb-6 md:ml-20 transform transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-900/60 hover:bg-gray-900/80 hover:shadow-md"
                          : "bg-gray-50 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <ol
                        className={`list-decimal list-inside space-y-2 md:space-y-3 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <li className="pb-1 md:pb-2">
                          Setelah menerima notifikasi, buka kembali menu{" "}
                          <strong>Unduh informasi Anda</strong>
                        </li>
                        <li className="pb-1 md:pb-2">
                          Anda akan melihat file ZIP yang siap diunduh
                        </li>
                        <li className="pb-1 md:pb-2">
                          Klik tombol <strong>Unduh</strong>
                        </li>
                        <li>File akan tersimpan di perangkat Anda</li>
                      </ol>
                    </div>
                  </div>
                  <div
                    className={`flex md:ml-20 items-start gap-4 p-4 md:p-6 rounded-xl transform transition-all duration-300 ${
                      darkMode
                        ? "bg-yellow-900/30 border border-yellow-800/40 hover:bg-yellow-900/40 hover:border-yellow-700/50"
                        : "bg-yellow-50 border border-yellow-100 hover:bg-yellow-100/80 hover:border-yellow-200"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 p-2 md:p-3 rounded-full ${
                        darkMode ? "bg-yellow-900/60" : "bg-yellow-100"
                      }`}
                    >
                      <AlertTriangle size={18} className="text-yellow-500" />
                    </div>
                    <p className="text-sm md:text-base">
                      Pastikan Anda mengunduh file dalam format{" "}
                      <strong>JSON</strong>. Format HTML tidak akan berfungsi
                      dengan aplikasi ini.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={cardVariants} className="group">
              <div
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/70 hover:bg-gray-800/90 border border-gray-700/50 hover:border-green-500/50 shadow-lg hover:shadow-green-500/10"
                    : "bg-white/80 hover:bg-white/95 border border-gray-200/50 hover:border-green-300/70 shadow-lg hover:shadow-green-300/20"
                }`}
              >
                <div
                  className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stepIconColors[2]}`}
                ></div>
                <div className="p-4 md:p-8">
                  <div className="flex flex-col">
                    <div className="flex md:items-start gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center text-white font-bold relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${stepIconColors[2]}`}
                          ></div>
                          <div className="relative flex flex-col items-center">
                            <span className="text-xl md:text-2xl">3</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4 flex items-center">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
                            Upload File ke Impostorgram
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div
                      className={`p-4 md:p-6 rounded-xl md:ml-20 mb-4 md:mb-6 transform transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-900/60 hover:bg-gray-900/80 hover:shadow-md"
                          : "bg-gray-50 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <ol
                        className={`list-decimal list-inside space-y-2 md:space-y-3 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <li className="pb-1 md:pb-2">
                          Kembali ke halaman utama Impostorgram
                        </li>
                        <li className="pb-1 md:pb-2">
                          Klik area upload atau drag-and-drop file ZIP Instagram
                          Anda
                        </li>
                        <li className="pb-1 md:pb-2">
                          Klik tombol <strong>Analisis Sekarang</strong>
                        </li>
                        <li>Tunggu proses analisis selesai</li>
                      </ol>
                    </div>
                    <div
                      className={`flex items-start gap-4 md:ml-20 p-4 md:p-6 rounded-xl transform transition-all duration-300 ${
                        darkMode
                          ? "bg-green-900/30 border border-green-800/40 hover:bg-green-900/40 hover:border-green-700/50"
                          : "bg-green-50 border border-green-100 hover:bg-green-100/80 hover:border-green-200"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 p-2 md:p-3 rounded-full ${
                          darkMode ? "bg-green-900/60" : "bg-green-100"
                        }`}
                      >
                        <Shield size={18} className="text-green-500" />
                      </div>
                      <p className="text-sm md:text-base">
                        Data Anda 100% aman. Semua proses analisis dilakukan di
                        perangkat Anda dan tidak ada data yang dikirim ke
                        server.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div variants={cardVariants}>
              <div
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/70 border border-gray-700/50"
                    : "bg-white/80 border border-gray-200/50"
                }`}
              >
                <div className="p-4 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    Pertanyaan Umum
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {[
                      {
                        question: "Apakah aplikasi ini aman?",
                        answer:
                          "Ya, 100% aman. Semua analisis dilakukan di browser Anda (client-side). Kami tidak menyimpan data Anda di server kami dan tidak ada data yang dikirim keluar.",
                        icon: (
                          <Shield
                            size={20}
                            className={
                              darkMode ? "text-purple-400" : "text-purple-500"
                            }
                          />
                        ),
                        gradient: "from-purple-400 to-pink-400",
                      },
                      {
                        question: "Berapa lama proses analisis?",
                        answer:
                          "Proses analisis biasanya hanya membutuhkan waktu beberapa detik, tergantung pada ukuran file dan jumlah following/followers Anda.",
                        icon: (
                          <Zap
                            size={20}
                            className={
                              darkMode ? "text-blue-400" : "text-blue-500"
                            }
                          />
                        ),
                        gradient: "from-blue-400 to-indigo-400",
                      },
                      {
                        question: "Apakah saya perlu login Instagram?",
                        answer:
                          "Tidak. Aplikasi ini hanya membutuhkan file data yang Anda unduh dari Instagram, bukan akses langsung ke akun Anda.",
                        icon: (
                          <Users
                            size={20}
                            className={
                              darkMode ? "text-green-400" : "text-green-500"
                            }
                          />
                        ),
                        gradient: "from-green-400 to-teal-400",
                      },
                      {
                        question: "Format file apa yang didukung?",
                        answer:
                          "Hanya format ZIP dari data Instagram dalam format JSON yang didukung. File HTML tidak akan berfungsi dengan aplikasi ini.",
                        icon: (
                          <InfoIcon
                            size={20}
                            className={
                              darkMode ? "text-orange-400" : "text-orange-500"
                            }
                          />
                        ),
                        gradient: "from-orange-400 to-red-400",
                      },
                      {
                        question: "Informasi apa yang bisa saya lihat?",
                        answer:
                          "Anda bisa melihat daftar akun yang Anda follow tetapi tidak nge-follow balik Anda (tidak followback).",
                        icon: (
                          <AlertTriangle
                            size={20}
                            className={
                              darkMode ? "text-yellow-400" : "text-yellow-500"
                            }
                          />
                        ),
                        gradient: "from-yellow-400 to-amber-400",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className={`p-4 md:p-6 rounded-xl border overflow-hidden relative group ${
                          darkMode
                            ? "border-gray-700/70 bg-gray-800/50 hover:bg-gray-800/80"
                            : "border-gray-200/70 bg-gray-50/80 hover:bg-white/90"
                        }`}
                      >
                        <div
                          className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.gradient}`}
                        ></div>
                        <div className="flex gap-4 mb-3">
                          <div
                            className={`p-2 rounded-lg ${
                              darkMode ? "bg-gray-700/70" : "bg-gray-100"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <h4 className="font-bold text-lg mt-1">
                            {item.question}
                          </h4>
                        </div>
                        <p
                          className={
                            darkMode
                              ? "text-gray-300 pl-12"
                              : "text-gray-600 pl-12"
                          }
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Return to Home Button */}
            <motion.div
              variants={cardVariants}
              className="flex justify-center mt-8 md:mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage("home")}
                className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold flex items-center space-x-3 shadow-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/20 hover:shadow-blue-500/40"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white shadow-blue-500/30 hover:shadow-blue-500/50"
                }`}
              >
                <ArrowLeft size={20} />
                <span>Kembali ke Analisis</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
