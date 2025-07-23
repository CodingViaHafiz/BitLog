// src/pages/AdminPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, userStats } from '../features/auth/authSlice';
import { getPostStats } from '../features/post/postSlice';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Loader from "../components/Loader";
import { hideLoader, showLoader } from '../features/loader/loaderSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPage = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading, totalUsers, initialized } = useSelector((state) => state.auth);
  const { loading: statsLoading, postStats } = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    dispatch(showLoader());
    if (!user && !initialized) {
      dispatch(fetchUser());
    }
    dispatch(hideLoader());
    dispatch(getPostStats());
  }, [dispatch, user, initialized]);

  useEffect(() => {
    if (user?.role === 'admin' && totalUsers === 0) {
      dispatch(userStats());
    }
  }, [user, totalUsers, dispatch]);

  if (userLoading) return <Loader />;
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto py-10"
    >

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap gap-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
          📊 Admin Dashboard
        </h1>
        <span className="text-md sm:text-lg text-gray-700">
          Welcome, <span className="font-semibold">{user.name}</span>
        </span>
      </div>

      {/* Post Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {[
          { label: 'This Week', value: postStats?.weekly || 0, color: 'text-indigo-500' },
          { label: 'This Month', value: postStats?.monthly || 0, color: 'text-emerald-500' },
          { label: 'This Year', value: postStats?.yearly || 0, color: 'text-yellow-500' },
          { label: 'All Time', value: postStats?.all || 0, color: 'text-rose-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className="bg-white/90 backdrop-blur-md shadow-md border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center transition-all"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <p className={`text-sm font-semibold uppercase tracking-wide ${stat.color}`}>
              {stat.label}
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Total Users */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white/90 backdrop-blur-md shadow-md border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-500">
            Total Users
          </p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">{totalUsers || 0}</h3>
        </motion.div>
      </motion.div>

      {/* Chart Section */}
      <motion.div
        className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-xl md:text-2xl font-semibold text-emerald-500 mb-6 flex items-center gap-2">
          📈 Post Activity Overview
        </h3>

        <div className="flex justify-center items-center w-full">
          {statsLoading ? (
            <Loader />
          ) : (
            <div className="w-full max-w-[400px] aspect-square">
              <Doughnut
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPage;
