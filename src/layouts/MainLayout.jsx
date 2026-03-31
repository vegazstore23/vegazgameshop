import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="bg-main text-white min-h-screen">
      <Navbar />

      <main className="pt-16 md:pt-20 pb-16">{children}</main>
    </div>
  );
}
