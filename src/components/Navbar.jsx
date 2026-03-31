import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          VEGAZ
        </Link>

        {/* MENU */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/stock"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }`
            }
          >
            StockList
          </NavLink>

          <NavLink
            to="/Topup"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }`
            }
          >
            Topup
          </NavLink>

          <NavLink
            to="/check-region"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }`
            }
          >
            Check Region
          </NavLink>

          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }`
            }
          >
            Calcullator
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
