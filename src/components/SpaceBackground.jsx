export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Layer 1: Radial Gradient Biru Gelap */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-[#020617] to-[#020617]"></div>

      {/* Layer 2: Bintang-bintang menggunakan Base64 SVG (Twinkling) */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='transparent'/%3E%3Ccircle cx='50' cy='50' r='1.5' fill='%23fff' opacity='0.8'/%3E%3Ccircle cx='250' cy='150' r='2' fill='%23fff' opacity='0.6'/%3E%3Ccircle cx='150' cy='300' r='1' fill='%23fff' opacity='0.7'/%3E%3Ccircle cx='350' cy='350' r='2.5' fill='%23fff' opacity='0.5'/%3E%3Ccircle cx='80' cy='220' r='1' fill='%23fff' opacity='0.9'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          animation: "twinkle-stars 4s infinite alternate",
        }}
      ></div>

      <style>{`
        @keyframes twinkle-stars {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
