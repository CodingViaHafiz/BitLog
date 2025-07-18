import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../features/post/postSlice';

const PostDetail = () => {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.posts.find((p) => p._id === id));
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete post")) {
      dispatch(deletePost({ id }))
    }
  }

  if (!user) {
    return <Navigate to={"/"} />
  }
  // if (user.role !== "admin") {
  //   return <Navigate to={"/me"} />
  // }
  if (!post) {
    return <p className='text-center mt-10 text-red-500'>post not found.</p>
  }
  return (
    <div className="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white/80 backdrop-blur-md border border-gray-200  rounded-3xl transition-all duration-300">
      {/* Title */}
      <h1 className="text-4xl text-center font-extrabold text-transparent bg-clip-text bg-fontColor">
        {post.title}
      </h1>

      {/* Author & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <p className="text-gray-600 text-sm">
          <span className="font-semibold text-gray-800">Author:</span> {post.author?.name}
        </p>
        <p className="text-xs text-gray-400 mt-1 sm:mt-0">
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      <div className="text-gray-800 leading-relaxed text-lg space-y-4">
        {post.content.split('\n').map((para, idx) => (
          <p
            dangerouslySetInnerHTML={{ __html: para }}
            key={idx}>
            {/* {para} */}
          </p>
        ))}
      </div>

      {/* Actions (optional) */}
      <div className="mt-8 flex justify-start">
        {user.role === "admin" && (
          <button
            onClick={() => handleDelete(post._id)}
            className='text-red-500'>Delete</button>
        )}
        {user.role === "admin" ? (
          <button
            onClick={() => navigate("/app/admin/posts")}
            className=' text-fontColor border font-semibold px-5 py-2 rounded-xl hover:shadow-lg transition-transform transform hover:scale-105'>
            Back
          </button>
        ) :
          <button
            onClick={() => navigate("/app/feed")}
            className=' text-fontColor border font-semibold px-5 py-2 rounded-xl hover:shadow-lg transition-transform transform hover:scale-105'>
            Back
          </button>
        }
      </div>
    </div>

  )
}

export default PostDetail
