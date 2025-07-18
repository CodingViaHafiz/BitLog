import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../features/post/postSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeedPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredPosts = searchQuery.trim()
    ? posts.filter((post) =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : posts;

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <div className="flex flex-col items-center text-center md:mt-[60px] mb-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-fontColor"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Community Feed
        </motion.h1>

        <motion.p
          className="text-sm font-semibold sm:text-md text-gray-500 mt-5 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Discover what others are thinking. Read, share, and connect with the community.
        </motion.p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts by title or content..."
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 px-5 py-3 rounded-xl bg-white/60 shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fontColor transition-all duration-300 text-headingText text-sm"
        />
      </div>

      {/* LOADING / ERROR MESSAGES */}
      {loading && (
        <p className="text-blue-500 animate-pulse text-lg font-medium mb-4 text-center">
          Loading posts...
        </p>
      )}
      {error && (
        <p className="text-red-600 text-md font-semibold mb-4 text-center">{error}</p>
      )}

      {/* NO MATCHING POSTS */}
      {!loading && filteredPosts.length === 0 && (
        <motion.p
          className="text-gray-500 italic text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No matching posts found.
        </motion.p>
      )}

      {/* POSTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          const contentPreview =
            post.content.length > 150
              ? post.content.slice(0, 150) + "..."
              : post.content;

          return (
            <motion.div
              key={post._id}
              onClick={() => navigate(`/app/posts/${post._id}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
            >
              <div className="h-full bg-white/60 backdrop-blur-md border  rounded-2xl hover:shadow-2xl hover:border-fontColor transition duration-300 overflow-hidden flex flex-col">
                {/* Author Info */}
                <div className="flex items-center gap-4 bg-white p-4">
                  <div className="w-12 h-12 bg-fontColor rounded-full text-white flex items-center justify-center text-lg font-bold shadow-md">
                    {post.author?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold text-sm">
                      {post.author?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="flex-grow p-5 flex flex-col">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt="Post"
                      className="rounded-xl mb-4 w-full h-60 object-cover"
                    />
                  ) : (
                    <div className="h-60 bg-gray-200 flex items-center justify-center text-gray-500 text-sm italic mb-4 rounded-xl">
                      No Image Available
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {post.title}
                  </h2>
                  <p
                    className="text-gray-700 text-sm leading-relaxed prose"
                    dangerouslySetInnerHTML={{ __html: contentPreview }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div >
    </motion.div >
  );
};

export default FeedPage;
