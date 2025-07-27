import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../features/post/postSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { showLoader } from '../features/loader/loaderSlice';
import Loader from '../components/Loader';

const FeedPage = () => {

  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // if (loading) return <Loader />;

  const categories = ['All', 'Technology', 'Health', 'Education', 'Travel', 'Food', 'News'];
  const [selectedCategory, setSelectedCategory] = useState('All');


  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      post.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  useEffect(() => {
    // dispatch(showLoader())
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <motion.div
      className="p-6 "
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
      <div className="flex flex-col items-center text-center md:mt-[60px] mb-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
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

      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts by title or content..."
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 px-5 py-3 rounded-xl bg-white/60 shadow-inner border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all duration-300 text-emerald-500 text-sm"
        />
      </div>

      <div className="relative mb-8">
        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((post) => (
            <button
              key={post}
              onClick={() => setSelectedCategory(post)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
          ${selectedCategory === post
                  ? 'bg-emerald-500 text-white shadow'
                  : 'bg-white text-emerald-600 border border-emerald-300 hover:bg-emerald-100'}
        `}
            >
              {post}
            </button>
          ))}
        </div>
      </div>


      {loading && (
        // <p className="text-blue-500 animate-pulse text-lg font-medium mb-4 text-center">
        //   Loading posts...
        // </p>
        <Loader />
      )}
      {error && (
        <p className="text-red-600 text-md font-semibold mb-4 text-center">{error}</p>
      )}

      {!loading && filteredPosts.length === 0 && (
        <motion.p
          className="text-gray-500 italic text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No matching posts found.
        </motion.p>
      )}

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
              <div className="h-full bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col group">

                {post.image ? (
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                ) : (
                  <div className="h-60 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 text-sm italic mb-4 rounded-t-2xl">
                    No Image Available
                  </div>
                )}

                <div className="flex-grow p-5 flex flex-col">

                  <h2 className="text-xl font-bold text-emerald-500 group-hover:text-black transition mb-1">
                    {post.title}
                  </h2>


                  <p
                    className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4"
                    dangerouslySetInnerHTML={{ __html: contentPreview }}
                  />


                  <div className="flex items-center mt-auto gap-3 pt-4 border-t border-gray-200">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {post.author?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {post.author?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
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
