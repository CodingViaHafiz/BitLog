import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../features/post/postSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeedPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

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
    <div className="p-6 max-w-7xl mx-auto">

      <div className="flex flex-col items-center text-center md:mt-[90px] mb-10">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-headingText">
          Community Feed
        </h1>
        <p className="text-sm sm:text-md text-gray-500 mt-5 max-w-xl">
          Discover what others are thinking. Read, share, and connect with the community 💬✨
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts by title or content..."
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 px-5 py-3 rounded-xl bg-white/60 shadow-inner border border-gray-300 focus:outline-none focus:ring-1 focus:ring-headingText transition-all duration-300 text-headingText text-sm"
        />
      </div>


      {loading && (
        <p className="text-blue-500 animate-pulse text-lg font-medium mb-4">
          Loading posts...
        </p>
      )}
      {error && (
        <p className="text-red-600 text-md font-semibold mb-4">{error}</p>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 italic text-center mt-10">
          No matching posts found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => {
            const contentPreview =
              post.content.length > 150
                ? post.content.slice(0, 150) + "..."
                : post.content;

            return (
              <motion.div
                key={post._id}
                onClick={() => navigate(`/posts/${post._id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <div className="h-full bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col">
                  {/* Author Info */}
                  <div className="flex items-center gap-4 bg-white p-4">
                    <div className="w-12 h-12 bg-headingText rounded-full text-white flex items-center justify-center text-lg font-bold shadow-md">
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
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {post.title}
                    </h2>
                    {/* <p>{post.slug}</p> */}
                    <p className="text-gray-700 text-sm leading-relaxed prose"
                      dangerouslySetInnerHTML={{ __html: contentPreview }}
                    >
                      {/* {contentPreview} */}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
      )
      }
    </div >
  );
};

export default FeedPage;
