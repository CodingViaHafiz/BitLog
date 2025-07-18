// src/pages/AdminPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/auth/authSlice';
import { getPostStats } from '../features/post/postSlice';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPage = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { loading: statsLoading, postStats } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!user) dispatch(fetchUser());
    dispatch(getPostStats());
  }, [dispatch]);

  if (userLoading) return <div className="text-center mt-20">Loading user info...</div>;
  if (!user) return <div className="text-center mt-20">Unauthorized. Please log in.</div>;
  if (user.role !== 'admin') return <p className="text-center text-red-600">Access denied: admin only</p>;

  const chartData = {
    labels: ['This Week', 'This Month', 'This Year'],
    datasets: [{
      label: 'Post Count',
      data: [
        postStats?.weekly || 0,
        postStats?.monthly || 0,
        postStats?.yearly || 0
      ],
      backgroundColor: ['#6366F1', '#22C55E', '#FACC15'],
      borderWidth: 2,
    }]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-fontblue text-center mb-6">📊 Admin Dashboard</h1>

      <div className="bg-white shadow rounded-2xl p-6 text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name}</h2>
        <p className="text-gray-600">Monitor posts & users from your panel</p>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🧭 Post Activity Overview
        </h3>
        {statsLoading ? (
          <p className="text-center">Loading chart...</p>
        ) : (
          <Doughnut data={chartData} options={{ responsive: true }} />
        )}
      </div>
    </motion.div>
  );
};

export default AdminPage;
