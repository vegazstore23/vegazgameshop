import { useEffect, useRef, useState } from "react";
import { apiGet } from "../../services/api";

export default function FeedbackSlider() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);

  // State untuk Animation & Interaksi
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const lastInteractionTime = useRef(0); // Untuk timer 3 detik
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  async function fetchFeedback() {
    try {
      const res = await apiGet("/api/feedback?limit=10");
      const data = Array.isArray(res)
        ? res
        : res?.data?.data || res?.data || [];
      setFeedbacks(data);
    } catch (err) {
      console.error("Feedback error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Helper untuk Touch & Mouse
  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  // ── Drag Handlers ──
  const onDragStart = (e) => {
    isDragging.current = true;
    lastInteractionTime.current = Date.now(); // Reset timer saat mulai sentuh
    startX.current = getClientX(e);
    scrollStart.current = trackRef.current.scrollLeft;
    velocity.current = 0;
    lastX.current = startX.current;
    lastTime.current = Date.now();

    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };

  const onDragMove = (e) => {
    if (!isDragging.current) return;

    const x = getClientX(e);
    const now = Date.now();
    const dt = now - lastTime.current || 1;

    // Hitung kecepatan (velocity) untuk efek momentum
    velocity.current = (lastX.current - x) / dt;
    lastX.current = x;
    lastTime.current = now;
    lastInteractionTime.current = now; // Update timer terus saat ditarik

    const delta = startX.current - x;
    trackRef.current.scrollLeft = scrollStart.current + delta;
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    lastInteractionTime.current = Date.now(); // Mulai hitung mundur 3 detik dari sini

    // Beri dorongan momentum setelah dilepas
    velocity.current *= 15;

    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  // ── Hover Handlers ──
  const onMouseEnter = () => {
    isHovered.current = true;
  };

  const onMouseLeave = () => {
    isHovered.current = false;
    if (!isDragging.current) {
      lastInteractionTime.current = Date.now(); // Mulai timer 3 detik pas kursor keluar
    }
    onDragEnd();
  };

  // ── Core Animation Loop ──
  useEffect(() => {
    if (!feedbacks.length) return;

    const loop = () => {
      const el = trackRef.current;
      if (!el) return;

      const now = Date.now();
      // Cek apakah baru saja berinteraksi dalam 3 detik terakhir (3000ms)
      const isPausedByTimer = now - lastInteractionTime.current < 1000;

      // 1. Eksekusi Momentum kalau baru dilepas
      if (!isDragging.current && Math.abs(velocity.current) > 0.1) {
        velocity.current *= 0.95; // Friksi lambat laun berhenti
        el.scrollLeft += velocity.current;
      }
      // 2. Eksekusi Auto Scroll (Marquee)
      else if (!isDragging.current && !isHovered.current && !isPausedByTimer) {
        el.scrollLeft += 0.7; // Kecepatan Marquee
      }

      // 3. Logic Infinite Loop (Tanpa Putus)
      // Kita pakai 3x duplikasi, jadi lebarnya 3 bagian.
      // Kalau nyentuh batas 2/3, balik ke 1/3 tanpa kelihatan.
      const oneThird = el.scrollWidth / 3;
      if (el.scrollLeft >= oneThird * 2) {
        el.scrollLeft -= oneThird;
      } else if (el.scrollLeft <= 0 && velocity.current < 0) {
        el.scrollLeft += oneThird;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, [feedbacks]);

  // ── Skeleton loader ──
  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[200px] h-[400px] rounded-xl bg-slate-800 animate-pulse border border-white/5"
          />
        ))}
      </div>
    );
  }

  if (!feedbacks.length) return null;

  const loopData = [...feedbacks, ...feedbacks, ...feedbacks];

  return (
    <div
      className="relative w-full select-none overflow-hidden group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-hidden px-4"
        style={{ cursor: "grab" }}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
      >
        {loopData.map((f, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[200px] aspect-[7/15] rounded-xl overflow-hidden border border-white/10 bg-slate-900 pointer-events-none shadow-lg transition-transform duration-300 group-hover:border-white/20"
          >
            <img
              src={f.image}
              alt="Feedback"
              draggable={false}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
