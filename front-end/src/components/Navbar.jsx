import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)

  const navLinks = [
    { to: "/app/feed", label: "Feed" },
    { to: "/app/posts/create", label: "Create Post" },
    { to: "/app/me", label: "My Account" },
  ];
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="bg-transparent backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-fontblue">
      <div className=" px-6 py-6 flex justify-between items-center relative">

        {/* Left: Logo */}
        <Link to="/app/feed" className="text-2xl font-bold text-fontblue">
          BitLog
        </Link>

        {/* Center: Links (desktop) */}
        <nav className="hidden md:flex space-x-6 text-xl font-semibold text-fontblue absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative group transition duration-300"
            >
              <span className="group-hover:text-black">
                {link.label}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Right: Logout (desktop) */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="px-4 py-1 text-md font-semibold text-fontblue border border-fontblue rounded-full hover:bg-hoverColor hover:text-white  transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-fontColor focus:outline-none"
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
            className="md:hidden bg-white border-t border-gray-200 shadow px-6 pt-4 pb-6"
          >
            <nav className="flex flex-col space-y-4 text-fontColor text-md font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600 transition"
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
