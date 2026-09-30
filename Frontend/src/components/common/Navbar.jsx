import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Bot,
  Menu,
  X,
  User,
  CalendarCheck,
  LogOut,
  ShieldCheck,
  Sparkles,
  Compass,
} from "lucide-react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `
      relative flex items-center gap-2 px-3 py-2
      text-sm font-medium no-underline transition-all duration-300
      ${
        isActive
          ? "text-saffron"
          : "text-white/90 hover:text-saffron"
      }
    `;

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* NAVBAR */}
      <nav
        className="
          w-full
          bg-[#111827]/85
          backdrop-blur-xl
          border-b border-white/10
          shadow-lg
        "
      >
        <div className="max-w-[1500px] mx-auto px-5 lg:px-10">
          <div className="h-[78px] flex items-center justify-between">

            {/* ================= LOGO ================= */}
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 no-underline group"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="TraditionHub"
                  className="
                    w-11 h-11
                    rounded-full
                    object-cover
                    border-2 border-white/20
                    group-hover:border-saffron
                    transition-all duration-300
                  "
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white leading-none">
                  Tradition<span className="text-saffron">Hub</span>
                </h1>

                <p className="text-[10px] text-white/50 tracking-[3px] uppercase mt-1">
                  Discover • Connect • Experience
                </p>
              </div>
            </Link>

            {/* ================= DESKTOP NAV ================= */}
            <div className="hidden lg:flex items-center gap-2">

              <NavLink to="/" className={navClass}>
                <Compass size={17} />
                <span>Home</span>
              </NavLink>

              <NavLink to="/explore" className={navClass}>
                <span>Explore</span>
              </NavLink>

              <NavLink to="/guides" className={navClass}>
                <span>Local Guides</span>
              </NavLink>

              {/* Tradition AI */}
              <NavLink
                to="/ai-guide"
                className={({ isActive }) =>
                  `
                  flex items-center gap-2
                  px-4 py-2
                  rounded-full
                  text-sm font-semibold
                  no-underline
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-saffron text-white shadow-md shadow-orange-500/20"
                      : "text-white border border-white/15 hover:border-saffron hover:text-saffron"
                  }
                  `
                }
              >
                <Bot size={17} />
                TraditionAI
              </NavLink>

              {/* AI Planner */}
              <NavLink
                to="/planner"
                className={({ isActive }) =>
                  `
                  flex items-center gap-2
                  px-4 py-2
                  rounded-full
                  text-sm font-semibold
                  no-underline
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-indigo-500/10 text-indigo-200 border border-indigo-400/20 hover:bg-indigo-500/20"
                  }
                  `
                }
              >
                <Sparkles size={16} />
                AI Planner
              </NavLink>

            </div>

            {/* ================= RIGHT SECTION ================= */}
            <div className="hidden lg:flex items-center gap-4">

              {token ? (
                <>
                  {/* My Guide Requests */}
                  <Link
                    to="/my-guide-requests"
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      text-sm font-medium
                      text-white/90
                      border border-white/10
                      hover:border-saffron
                      hover:text-saffron
                      transition-all duration-300
                      no-underline
                    "
                  >
                    <CalendarCheck size={17} />
                    My Requests
                  </Link>

                  {/* Admin */}
                  {role === "admin" && (
                    <NavLink
                      to="/admin"
                      className="
                        flex items-center gap-2
                        text-white/90
                        hover:text-saffron
                        text-sm font-medium
                        no-underline
                        transition
                      "
                    >
                      <ShieldCheck size={17} />
                      Admin
                    </NavLink>
                  )}

                  {/* Profile */}
                  <div className="relative">

                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="
                        flex items-center justify-center
                        w-10 h-10
                        rounded-full
                        bg-white/10
                        border border-white/15
                        text-white
                        hover:bg-saffron
                        transition-all duration-300
                      "
                    >
                      <User size={19} />
                    </button>

                    {profileOpen && (
                      <div
                        className="
                          absolute right-0 top-14
                          w-56
                          bg-white
                          rounded-2xl
                          shadow-2xl
                          border border-gray-100
                          overflow-hidden
                        "
                      >

                        <div className="px-5 py-4 bg-gray-50 border-b">
                          <p className="text-xs text-gray-400 uppercase tracking-wider">
                            Account
                          </p>

                          <p className="font-semibold text-gray-800 mt-1">
                            Welcome back
                          </p>
                        </div>

                        <Link
                          to="/my-guide-requests"
                          onClick={() => setProfileOpen(false)}
                          className="
                            flex items-center gap-3
                            px-5 py-3
                            text-gray-700
                            hover:bg-orange-50
                            hover:text-saffron
                            no-underline
                            transition
                          "
                        >
                          <CalendarCheck size={18} />
                          My Guide Requests
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="
                            w-full
                            flex items-center gap-3
                            px-5 py-3
                            text-red-500
                            hover:bg-red-50
                            transition
                            border-t
                            text-left
                          "
                        >
                          <LogOut size={18} />
                          Logout
                        </button>

                      </div>
                    )}

                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="
                      text-white/90
                      hover:text-saffron
                      text-sm font-medium
                      no-underline
                      transition
                    "
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="
                      flex items-center gap-2
                      px-5 py-2.5
                      rounded-full
                      bg-saffron
                      text-white
                      text-sm font-semibold
                      no-underline
                      shadow-lg shadow-orange-500/20
                      hover:bg-orange-600
                      hover:scale-105
                      transition-all duration-300
                    "
                  >
                    Join TraditionHub
                  </NavLink>
                </>
              )}

            </div>

            {/* ================= MOBILE BUTTON ================= */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
                lg:hidden
                text-white
                p-2
                rounded-lg
                hover:bg-white/10
                transition
              "
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div
            className="
              lg:hidden
              border-t border-white/10
              bg-[#111827]
              px-5 py-5
            "
          >

            <div className="flex flex-col gap-2">

              <NavLink
                to="/"
                onClick={closeMobile}
                className={navClass}
              >
                <Compass size={18} />
                Home
              </NavLink>

              <NavLink
                to="/explore"
                onClick={closeMobile}
                className={navClass}
              >
                Explore
              </NavLink>

              <NavLink
                to="/guides"
                onClick={closeMobile}
                className={navClass}
              >
                Local Guides
              </NavLink>

              <NavLink
                to="/ai-guide"
                onClick={closeMobile}
                className={navClass}
              >
                <Bot size={18} />
                TraditionAI
              </NavLink>

              <NavLink
                to="/planner"
                onClick={closeMobile}
                className={navClass}
              >
                <Sparkles size={18} />
                AI Planner
              </NavLink>

              {token && (
                <>
                  <Link
                    to="/my-guide-requests"
                    onClick={closeMobile}
                    className="
                      flex items-center gap-2
                      px-3 py-3
                      text-white/90
                      hover:text-saffron
                      no-underline
                      border-t border-white/10
                      mt-2
                    "
                  >
                    <CalendarCheck size={18} />
                    My Guide Requests
                  </Link>

                  {role === "admin" && (
                    <NavLink
                      to="/admin"
                      onClick={closeMobile}
                      className={navClass}
                    >
                      <ShieldCheck size={18} />
                      Admin
                    </NavLink>
                  )}

                  <button
                    onClick={handleLogout}
                    className="
                      flex items-center gap-2
                      px-3 py-3
                      text-red-400
                      hover:text-red-300
                      text-left
                      border-t border-white/10
                      mt-2
                    "
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}

              {!token && (
                <div className="flex gap-3 pt-3 border-t border-white/10 mt-2">
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="
                      flex-1
                      text-center
                      py-2.5
                      rounded-full
                      border border-white/20
                      text-white
                      no-underline
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="
                      flex-1
                      text-center
                      py-2.5
                      rounded-full
                      bg-saffron
                      text-white
                      no-underline
                    "
                  >
                    Join
                  </Link>
                </div>
              )}

            </div>
          </div>
        )}

      </nav>
    </header>
  );
};

export default Navbar;