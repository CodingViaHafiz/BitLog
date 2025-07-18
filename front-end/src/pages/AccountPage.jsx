import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deletePost, fetchMyPosts, updatePost
} from "../features/post/postSlice"
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from "../features/auth/authSlice"

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, initialized } = useSelector((state) => state.auth);
  const { loading, error, posts } = useSelector((state) => state.posts);

  // editing post 
  const [editingPostId, setEditingPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: ""
  });

  if (!initialized) {
    return <p className="text-center mt-20">Loading user info...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;
  }

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyPosts());
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    console.log("[FRONTEND] posts state after fetch:", posts);
  }, [posts]);

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditFormData({
      title: post.title,
      content: post.content
    });
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


  const userPosts = posts;

  return (
    <div className="px-6 py-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-3xl font-bold text-fontblue">Welcome {user.name}</h1>
        <div className="mb-6">
          <Link
            to="/app/posts/create"
            className="inline-block bg-fontblue hover:bg-hoverColor text-white font-medium px-5 py-2 rounded-md transition hover:scale-105"
          >
            + Create New Post
          </Link>
        </div>
      </div>

      {/* Create Post Button */}

      {/* My Posts Heading */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Posts</h2>

      {/* User Posts */}
      {userPosts.length === 0 ? (
        <p className="text-gray-500 italic">You haven't created any posts yet.</p>
      ) : (
        userPosts.map((post) =>
          editingPostId === post._id ? (
            <form
              key={post._id}
              onSubmit={handleEditSubmit}
              className="bg-white border border-gray-200 p-4 rounded-md shadow-sm mb-4"
            >
              <input
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
                placeholder="Post Title"
              />
              <textarea
                name="content"
                value={editFormData.content}
                onChange={handleEditChange}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
                placeholder="Post Content"
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
            <div
              key={post._id}
              className="bg-white border border-gray-200 p-5 rounded-md shadow-sm mb-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-700 mt-1"
                dangerouslySetInnerHTML={{ __html: post.content }}
              >

              </p>
              <div className="flex space-x-4 mt-3">
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
          )
        )
      )}
    </div >


  );
};

export default AccountPage;
