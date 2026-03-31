import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

export default function FeedbackSlider() {
  const [feedbacks, setFeedbacks] = useState([]);

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
    }
  }

  if (!feedbacks.length) return null;

  // duplicate biar looping
  const loopData = [...feedbacks, ...feedbacks];

  return (
    <div className="overflow-hidden relative">
      <div className="flex gap-4 animate-scroll">
        {loopData.map((f, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[220px] aspect-[7/15] rounded-xl overflow-hidden border border-white/10"
          >
            <img src={f.image} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
