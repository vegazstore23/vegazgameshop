import { motion } from "framer-motion";

import Logo from "../../assets/logo/vegazgameshop.png";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#172454] flex flex-col items-center justify-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.05, 1],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
 
        <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full" />

        <img
          src={Logo}
          alt="VegazGameShop Logo"
          className="w-32 md:w-40 relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
      </motion.div>

      {/* Teks Loading & Progress Bar Kecil */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
          Loading Resources
        </p>

        {/* Bar Loading Sederhana */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
