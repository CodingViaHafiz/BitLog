import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  // console.log(useScroll())
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { to: "/app/feed", label: "Feed" },
    { to: "/app/posts/create", label: "Create Post" },
    { to: "/app/me", label: "My Account" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Variants for staggering child animations
  const navbarVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <header className="sticky top-0 z-50 bg-emerald-100/90 dark:bg-gray-900/70 backdrop-blur-lg shadow  dark:border-gray-800">
      <motion.div
        className="container mx-auto px-4 py-4 flex justify-between items-center"
        variants={navbarVariants}
        initial="initial"
        animate="animate"
      >

        <motion.div variants={itemVariants}>
          <Link
            to="/app/feed"
            className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight"
          >
            BitLog
          </Link>
        </motion.div>

        <motion.nav
          className="hidden md:flex gap-10 font-semibold text-[20px] items-center"
          variants={navbarVariants}
        >
          {navLinks.map((link, index) => (
            <motion.div key={link.to} variants={itemVariants}>
              <Link
                to={link.to}
                className={`relative group transition-all duration-300 ${location.pathname === link.to
                  ? "text-emerald-700 dark:text-emerald-300 font-semibold"
                  : "text-emerald-600 dark:text-emerald-400"
                  }`}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div className="hidden md:block" variants={itemVariants}>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-emerald-600 text-white border border-emerald-600 hover:text-white transition hover:scale-105 font-medium"
          >
            Logout
          </button>
        </motion.div>

        <motion.button
          className="md:hidden text-emerald-700 dark:text-emerald-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          variants={itemVariants}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pb-6 pt-2 bg-emerald-100 dark:bg-gray-900 border-t border-emerald-200 dark:border-gray-700 shadow-md"
          >
            <motion.ul className="flex flex-col space-y-5 text-[17px] font-medium">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`block transition ${location.pathname === link.to
                      ? "text-emerald-900 dark:text-emerald-300 font-semibold"
                      : "text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-left w-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 font-medium transition"
                >
                  Logout
                </button>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div
        style={{
          scaleX
        }}
        className="bg-emerald-500 origin-center w-full h-2"
      >

      </motion.div>
    </header>
  );
};

export default Navbar;
