import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const baseLink =
    "text-indigoDark no-underline hover:text-saffron transition font-medium";

  const activeLink =
    "text-saffron border-b-2 border-saffron pb-1";

  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-goldMuted/40">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 no-underline">
            <img
                src={logo}
                alt="TraditionX Logo"
                className="h-14 w-14 rounded-full object-cover border-2 border-saffron shadow-md"
            />
            <span className="text-3xl font-bold tracking-wide text-indigoDark">
                Tradition<span className="text-saffron">Hub</span>
            </span>
        </Link>
        
        {/* Center Navigation */}
        <div className="flex items-center gap-10 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${baseLink} ${activeLink}` : baseLink
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? `${baseLink} ${activeLink}` : baseLink
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/planner"
            className={({ isActive }) =>
              isActive ? `${baseLink} ${activeLink}` : baseLink
            }
          >
            Planner
          </NavLink>

          <NavLink
            to="/guides"
            className={({ isActive }) =>
              isActive ? `${baseLink} ${activeLink}` : baseLink
            }
          >
            Guides
          </NavLink>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/login"
            className="text-sm font-medium text-indigoDark hover:text-saffron no-underline transition"
          >
            Login
          </NavLink>
          {localStorage.getItem("role") === "admin" && (
          <Link to="/admin/add-place">Admin Panel</Link>
          )}


          <NavLink
            to="/register"
            className="bg-saffron text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#d65f44] transition no-underline"
          >
            Join
          </NavLink>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
