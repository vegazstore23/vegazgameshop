export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 pb-10">
      {/* Butang Sebelumnya */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-white/5 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/5 transition"
      >
        Sebelum
      </button>

      {/* Nombor Halaman */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-8 h-8 rounded flex items-center justify-center transition ${
                currentPage === pageNum
                  ? "bg-blue-600 shadow-lg shadow-blue-500/50 scale-110"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Butang Seterusnya */}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-white/5 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/5 transition"
      >
        Seterusnya
      </button>
    </div>
  );
}
