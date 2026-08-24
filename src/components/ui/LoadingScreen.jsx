import { motion } from "framer-motion";
import Logo from "../../assets/logo/vgs.svg";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#172454] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* Logo & Glow */}
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
          className="relative flex items-center justify-center"
        >
          {/* Glow Biru / Cyan */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-cyan-400/40 blur-[50px] rounded-full scale-125" />

          <img
            src={Logo}
            alt="VegazGameShop Logo"
            className="w-52 md:w-48 relative z-10 drop-shadow-[0_0_20px_rgba(37,99,235,0.6)]"
          />
        </motion.div>

        {/* Teks & Bar Loading (Lebih rapat: mt-3, font fancy & futuristik) */}
        <div className="mt-3 flex flex-col items-center gap-2">
          <p className="text-cyan-300/80 text-[11px] font-bold tracking-[0.35em] uppercase font-mono animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            Loading Resources...
          </p>

          {/* Bar Loading Sederhana */}
          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
