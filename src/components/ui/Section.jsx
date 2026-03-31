export default function Section({ bg, children }) {
  return (
    <section
      className="py-10 bg-cover bg-center border-y border-white/5"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-7xl mx-auto px-4">{children}</div>
    </section>
  );
}
