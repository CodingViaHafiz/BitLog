
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../features/post/postSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminPosts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-fontblue mb-6 text-center">📝 All Posts</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(posts) &&
          posts.map((post, idx) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <Link to={`/app/posts/${post._id}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-indigo-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
                    {post.author?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{post.author?.name}</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                <div
                  className="text-sm text-gray-600 line-clamp-3 mb-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <p className="text-indigo-600 text-sm font-medium mt-auto">Read more →</p>
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default AdminPosts;
