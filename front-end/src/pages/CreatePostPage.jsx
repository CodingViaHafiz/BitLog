import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from '../features/post/postSlice'
// import useRouter from "react"
// import axios from 'axios';

const CreatePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(createPost(formData)).unwrap()
      setFormData({
        title: "",
        content: ""
      })
      navigate("/feed")
    } catch (error) {
      console.log(error)
    }
  }
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/auth/login")
  //   }
  // })
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Create New Post
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Post Title"
            required
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your content here..."
            rows={6}
            required
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            {loading ? "Posting..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePostPage
