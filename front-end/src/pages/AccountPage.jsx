import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchMyPosts, updatePost } from "../features/post/postSlice";
import { Link } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import { motion } from 'framer-motion';

const AccountPage = () => {
  const dispatch = useDispatch();
  const { user, initialized } = useSelector((state) => state.auth);
  const { loading, error, posts } = useSelector((state) => state.posts);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyPosts());
    }
  }, [dispatch, user?._id]);

  if (!initialized) return <p className="text-center mt-20">Loading user info...</p>;
  if (!user) return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditFormData({ title: post.title, content: post.content });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id: editingPostId, updatedData: editFormData })).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        setEditingPostId(null);
      }
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the post?")) {
      dispatch(deletePost({ id }));
    }
  };

  return (
    <motion.div
      className="min-h-screen px-4 sm:px-6 md:px-10 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10"
      >
        <h1 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 font-bold">
          Welcome, {user.name}
        </h1>
        <Link
          to="/app/posts/create"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          + Create New Post
        </Link>
      </motion.div>

      <motion.h2
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6"
      >
        My Posts
      </motion.h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 italic">You haven't created any posts yet.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200 flex flex-col h-full">
                {editingPostId === post._id ? (
                  <form onSubmit={handleEditSubmit} className="p-4 space-y-3">
                    <input
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Post Title"
                    />
                    <Editor
                      apiKey="z43igi6uxlih9byfjt5szosrk89qu9prnylbztf9umdn4ckc"
                      value={editFormData.content}
                      init={{
                        height: 250,
                        menubar: false,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'preview',
                          'anchor', 'searchreplace', 'visualblocks', 'code',
                          'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                        ],
                        toolbar:
                          'undo redo | formatselect | bold italic backcolor | \
alignleft aligncenter alignright alignjustify | \
bullist numlist outdent indent | removeformat | help'
                      }}
                      onEditorChange={(newContent) =>
                        setEditFormData({ ...editFormData, content: newContent })
                      }
                    />
                    <div className="flex gap-3">
                      <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPostId(null)}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 flex flex-col h-full">
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-40 object-cover rounded-xl mb-3"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                      {post.title}
                    </h3>
                    <div
                      className="text-sm text-gray-700 flex-grow overflow-hidden mb-3 line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <div className="flex space-x-4 text-sm mt-auto">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AccountPage;
