import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "../../assets/logo/vgs.svg";

const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_IN = [0.7, 0, 0.84, 0];

// Pita cahaya miring yang menyapu permukaan logo (seperti lampu menyorot aluminium)
const SHEEN_GRADIENT =
  "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.12) 55%, transparent 60%)";

// Cahaya hanya muncul di area logo (dipotong memakai bentuk SVG-nya)
const logoMask = {
  WebkitMaskImage: `url(${Logo})`,
  maskImage: `url(${Logo})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  backgroundImage: SHEEN_GRADIENT,
  backgroundSize: "300% 100%",
  backgroundRepeat: "no-repeat",
};

/**
 * isLoading = true  -> logo muncul, melayang pelan, disapu cahaya
 * isLoading = false -> logo zoom-in, layar larut dan menyatu dengan konten web
 */
export default function LoadingScreen({ isLoading = true }) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] bg-[#172454] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, delay: 0.3, ease: "easeInOut" },
          }}
        >
          {/* 1) Pop-up masuk  /  3) Zoom-in keluar */}
          <motion.div
            className="will-change-transform"
            initial={{ opacity: 0, y: 28, scale: 0.9, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{
              scale: reduce ? 1 : 16,
              opacity: [1, 1, 0],
              filter: "blur(2px)",
              transition: {
                duration: 1.1,
                ease: EASE_IN,
                opacity: { duration: 1.1, times: [0, 0.6, 1] },
              },
            }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
          >
            {/* Melayang halus seperti hover */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              }}
            >
              <div className="relative">
                <img
                  src={Logo}
                  alt="VegazGameShop Logo"
                  className="w-52 md:w-48 block select-none"
                  draggable={false}
                />

                {/* 2) Sapuan cahaya di permukaan logo */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={logoMask}
                    initial={{ backgroundPosition: "100% 0" }}
                    animate={{ backgroundPosition: "0% 0" }}
                    transition={{
                      duration: 1.6,
                      ease: [0.45, 0, 0.25, 1],
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      delay: 1.0,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
