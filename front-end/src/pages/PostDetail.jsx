import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { deletePost } from '../features/post/postSlice';
import { motion } from 'framer-motion';

const PostDetail = () => {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.posts.find((p) => p._id === id));
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost({ id }));
    }
  };

  if (!user) return <Navigate to="/" />;
  if (!post) return <p className='text-center mt-10 text-red-500'>Post not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto mt-4 px-6 py-10  dark:bg-[#1a1a1a]/70 backdrop-blur-md transition-all duration-300"
    >
      {/* Image Section with Overlay */}
      {post.image ? (
        <div className="relative rounded-[90px] overflow-hidden mb-6 shadow-md">
          <motion.img
            src={post.image}
            alt="Post cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400 rounded-2xl mb-6">
          No image available
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl text-center font-extrabold text-emerald-500  mb-6">
        {post.title}
      </h1>

      {/* Author & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-medium text-gray-800 dark:text-white">Author:</span> {post.author?.name}
        </p>
        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-0">
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      <motion.div
        className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-xl prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {post.content.split('\n').map((para, idx) => (
          <p
            key={idx}
            dangerouslySetInnerHTML={{ __html: para }}
          />
        ))}
      </motion.div>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        {user.role === "admin" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(post._id)}
            className="text-red-600 font-semibold px-6 py-2 border border-red-500 rounded-xl hover:bg-red-100 dark:hover:bg-red-900 transition-all"
          >
            Delete
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(user.role === "admin" ? "/app/admin/posts" : "/app/feed")}
          className="text-emerald-500 hover:bg-emerald-50 px-6 py-2 rounded-xl font-semibold border border-emerald-500  transition-all"
        >
          Back
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PostDetail;
