import { motion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // Mulai dari transparan dan turun 40px
      whileInView={{ opacity: 1, y: 0 }} // Saat masuk layar: muncul dan naik ke posisi asli
      viewport={{ once: true, margin: "-100px" }} // Animasi hanya jalan sekali saat 100px terlihat
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Cubic-bezier untuk gerakan yang lebih smooth/premium
      }}
    >
      {children}
    </motion.div>
  );
}
