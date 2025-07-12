import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createPost, deletePost, fetchMyPosts, updatePost
} from "../features/post/postSlice"
import PostForm from '../components/PostForm'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from "../features/auth/authSlice"


const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, initialized } = useSelector((state) => state.auth);
  const { loading, error, posts } = useSelector((state) => state.posts);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  // editing post 
  const [editingPostId, setEditingPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: ""
  })

  if (!initialized) {
    return <p className="text-center mt-20">Loading user info...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;
  }


  useEffect(() => {
    console.log("User in useEffect:", user)
    if (user?.id) dispatch(fetchMyPosts())
  }, [dispatch, user?.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setFormData({ title: "", content: "" });
        setShowForm(false);
      }
    });
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id) // mark which post is being edited
    setEditFormData({
      title: post.title,
      content: post.content
    })
  }

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id: editingPostId, updatedData: editFormData })).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        setEditingPostId(null) // close the form
      }
    })
  }

  // delete post
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the post?")) {
      dispatch(deletePost({ id }))
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/")
      }
    })
  }


  // const userPosts = posts.filter((post) => post.author._id === user.id)
  const userPosts = posts;



  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">My Account</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
        <Link
          to={"/feed"}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Feed
        </Link>
      </div>

      {/* Create Post Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
      >
        {showForm ? "Cancel" : "Create New Post"}
      </button>

      {/* Create Post Form */}
      {showForm && (
        <div className="mb-6">
          <PostForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            buttonLabel="Create Post"
          />
        </div>
      )}

      {/* List User Posts */}
      <h2 className="text-xl font-semibold mb-4">My Posts</h2>

      {userPosts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        Array.isArray(userPosts) && userPosts.map((post) =>
          editingPostId === post._id ? (
            <form
              key={post._id}
              onSubmit={handleEditSubmit}
              className="space-y-2 bg-white p-4 rounded-md shadow mb-4"
            >
              <input
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                className="w-full border px-2 py-1"
              />
              <textarea
                name="content"
                value={editFormData.content}
                onChange={handleEditChange}
                className="w-full border px-2 py-1"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPostId(null)}
                  className="text-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div
              key={post._id}
              className="bg-white p-4 rounded-md shadow mb-4"
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p>{post.content}</p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          )
        )
      )}

    </div>
  );
};

export default AccountPage
