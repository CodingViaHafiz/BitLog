
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { totalPostsAuthor } from '../features/post/postSlice';
import { fetchUser } from '../features/auth/authSlice';
import { motion } from 'framer-motion';

const AdminManageUsers = () => {
  const dispatch = useDispatch();
  const { authorStats } = useSelector((state) => state.posts);
  const { user, loading: userLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) dispatch(fetchUser());
    dispatch(totalPostsAuthor());
  }, [dispatch]);

  if (userLoading) return <div className="text-center mt-20">Loading user info...</div>;
  if (!user) return <div className="text-center mt-20">Unauthorized. Please log in.</div>;
  if (user.role !== 'admin') return <p className="text-center text-red-600">Access denied: admin only</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-fontblue mb-6">👥 Author Statistics</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(authorStats) &&
          authorStats.map((author, idx) => (
            <motion.div
              key={author.authorName + idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-1">👤 {author.authorName}</h3>
              <p className="text-sm text-gray-500">{author.authorEmail}</p>
              <p className="text-sm text-gray-700 mt-2">Total Posts: <strong>{author.totalPosts}</strong></p>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default AdminManageUsers;
