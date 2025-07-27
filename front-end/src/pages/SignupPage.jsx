import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupUser(formData)).then((res) => {
      // console.log("Signup response:", res);
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };
  // console.log("SignupPage loaded");


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-peach-400 via-peach-100 to-peach-400
 ">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/60 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-emerald-500 mb-6">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-emerald-500 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-emerald-500 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-emerald-500 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-white hover:text-emerald-500 border hover:border-emerald-500 py-2 font-semibold rounded-md hover:bg-white transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupPage;
