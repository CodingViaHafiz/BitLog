import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const navLinks = [
    { to: "/app/feed", label: "Feed" },
    { to: "/app/posts/create", label: "Create Post" },
    { to: "/app/me", label: "My Account" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="sticky top-0 z-50 bg-emerald-100 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="relative px-6 py-5 flex justify-between items-center ">

        {/* Left: Logo */}
        <Link to="/app/feed" className="text-2xl font-bold text-emerald-500 dark:text-emerald-400">
          BitLog
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8  font-semibold text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative group transition duration-300 ${location.pathname === link.to
                ? "font-bold text-emerald-700 dark:text-emerald-400"
                : "text-emerald-600 dark:text-emerald-300"
                }`}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Right: Logout Button (Desktop) */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 text-md font-medium rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition dark:border-emerald-300 dark:text-emerald-300 dark:hover:bg-emerald-300 dark:hover:text-black"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-emerald-600 dark:text-emerald-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown (animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-emerald-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow px-6 pt-4 pb-6"
          >
            <nav className="flex flex-col space-y-4 text-emerald-600 dark:text-emerald-300 text-md font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`transition ${location.pathname === link.to
                    ? "font-semibold text-black dark:text-emerald-400"
                    : "hover:text-emerald-700 dark:hover:text-emerald-400"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-left hover:text-red-600 transition"
              >
                Logout
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
