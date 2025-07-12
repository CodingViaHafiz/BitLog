import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../features/post/postSlice';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FeedPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const toggleExpand = (postId) => {
    setExpandedPostId((prev) => (prev === postId ? null : postId))
  }

  useEffect(() => {
    dispatch(fetchAllPosts());
    // console.log("posts", posts, typeof posts);
  }, [dispatch]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Community Feed
        </h1>
        <Link
          to="/me"
          className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow hover:shadow-md hover:scale-105 transition duration-300"
        >
          Profile
        </Link>
      </div>

      {/* Loading and Error */}
      {loading && (
        <p className="text-blue-500 animate-pulse text-lg font-medium mb-4">
          Loading posts...
        </p>
      )}
      {error && (
        <p className="text-red-600 text-md font-semibold mb-4">
          {error}
        </p>
      )}

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-gray-500 italic text-center mt-10">No posts yet. Be the first to share!</p>
      ) : (
        posts.map((post) => {
          const isExpanded = expandedPostId === post._id;
          const contentPreview = post.content.length > 150
            ? post.content.slice(0, 150) + "..."
            : post.content;

          return (
            <div
              key={post._id}
              className="flex flex-row bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 mb-6 overflow-hidden"
            >
              {/* Left - Author Info */}
              <div className="w-1/4 bg-gradient-to-br from-purple-100 to-pink-100 p-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full text-white flex items-center justify-center text-xl font-bold shadow-md mb-2">
                  {post.author?.name?.charAt(0).toUpperCase()}
                </div>
                <p className="text-center text-sm font-medium text-gray-700">{post.author?.name}</p>
                <span className="text-xs text-gray-400 mt-1">{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Right - Content */}
              <div className="w-3/4 p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{post.title}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {isExpanded ? post.content : contentPreview}
                </p>
                {post.content.length > 150 && (
                  <button
                    onClick={() => toggleExpand(post._id)}
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default FeedPage;
