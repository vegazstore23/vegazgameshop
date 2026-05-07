import { useEffect, useRef, useState } from "react";
import { apiGet } from "../../services/api";

export default function FeedbackSlider() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);

  const isDragging = useRef(false);
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
      const res = await apiGet("/api/feedback?limit=5");
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

  function applyMomentum() {
    const el = trackRef.current;
    if (!el) return;
    velocity.current *= 0.93;
    el.scrollLeft += velocity.current;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    if (el.scrollLeft <= 0 && velocity.current < 0) el.scrollLeft += half;
    if (Math.abs(velocity.current) > 0.5) {
      rafId.current = requestAnimationFrame(applyMomentum);
    } else {
      velocity.current = 0;
    }
  }

  function getClientX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function onDragStart(e) {
    cancelAnimationFrame(rafId.current);
    isDragging.current = true;
    startX.current = getClientX(e);
    scrollStart.current = trackRef.current.scrollLeft;
    velocity.current = 0;
    lastX.current = startX.current;
    lastTime.current = Date.now();
    trackRef.current.style.cursor = "grabbing";
  }

  function onDragMove(e) {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = getClientX(e);
    const now = Date.now();
    const dt = now - lastTime.current || 1;
    velocity.current = (lastX.current - x) / dt;
    lastX.current = x;
    lastTime.current = now;
    const delta = startX.current - x;
    const el = trackRef.current;
    let next = scrollStart.current + delta;
    const half = el.scrollWidth / 2;
    if (next >= half) next -= half;
    if (next < 0) next += half;
    el.scrollLeft = next;
  }

  function onDragEnd() {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = "grab";
    velocity.current *= 16;
    rafId.current = requestAnimationFrame(applyMomentum);
  }

  useEffect(() => {
    if (!feedbacks.length) return;
    let autoRaf;
    function autoScroll() {
      if (isDragging.current) {
        autoRaf = requestAnimationFrame(autoScroll);
        return;
      }
      const el = trackRef.current;
      if (!el) return;
      el.scrollLeft += 0.6;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      autoRaf = requestAnimationFrame(autoScroll);
    }
    autoRaf = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(autoRaf);
  }, [feedbacks]);

  // ── Skeleton loader ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[220px] aspect-[7/15] rounded-xl bg-white/5 animate-pulse border border-white/5"
          />
        ))}
      </div>
    );
  }

  // ── Jika tiada feedback (API error atau kosong), jangan render gap kosong ──
  if (!feedbacks.length) return null;

  const loopData = [...feedbacks, ...feedbacks];

  return (
    <div className="relative w-full select-none">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black/40 to-transparent" />

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-scroll"
        style={{
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
      >
        <style>{`.feedback-track::-webkit-scrollbar { display: none; }`}</style>

        {loopData.map((f, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[220px] aspect-[7/15] rounded-xl overflow-hidden border border-white/10 pointer-events-none"
          >
            <img
              src={f.image}
              alt={`Feedback pelanggan ${(i % feedbacks.length) + 1}`}
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
