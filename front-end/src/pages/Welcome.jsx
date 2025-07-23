import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import welcomeImg from "../assets/welcomeImg.png"; // Ensure correct path
import { useSelector } from "react-redux";

const WelcomePage = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex items-center justify-center px-6 py-12 overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center gap-12">

        <div className="flex-1 text-center md:text-left space-y-6">

          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 70, delay: 0.2 }}
          >
            Welcome to <br />
            <span className="text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text "

            >BitLog</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 70, delay: 0.5 }}
          >
            Join a vibrant space of creators and thinkers. Share ideas, write freely,
            and be part of something meaningful.
          </motion.p>

          <motion.button
            onClick={() => user ? navigate("/app/feed") : navigate("/login")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.4 }}
          >
            Explore the Community →
          </motion.button>

        </div>

        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
        >
          <motion.img
            src={welcomeImg}
            alt="Blog Illustration"
            className="w-full h-[460px] max-w-md rounded-[90px]"
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
