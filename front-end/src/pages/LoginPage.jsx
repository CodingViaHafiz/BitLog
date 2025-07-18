import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loginUser } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMyPosts } from '../features/post/postSlice';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (result.type === 'auth/login/fulfilled') {
      await dispatch(fetchUser());           //  Get logged-in user
      await dispatch(fetchMyPosts());        //  Get their posts
      navigate('/app/me');                       //  Go to account page
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/60 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-fontColor">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-fontColor rounded-xl focus:outline-none focus:ring-1 focus:ring-fontColor"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-fontColor rounded-xl focus:outline-none focus:ring-1 focus:ring-fontColor"
            required
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-fontColor hover:bg-white text-white hover:text-fontColor font-semibold py-2 rounded-xl transition duration-200 border hover:border-fontColor"
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>

          <p className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-fontColor underline  transition">
              Sign up
            </Link>
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </motion.div>


    </div>
  );
};

export default LoginPage;
