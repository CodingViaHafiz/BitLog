import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.posts.find((p) => p._id === id));
  if (!post) {
    return <p className='text-center mt-10 text-red-500'>post not found.</p>
  }
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 border rounded-2xl shadow-md bg-white">
      <h1 className="text-3xl font-bold text-emerald-700 mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-1">
        Author: <span className="font-semibold">{post.author?.name}</span>
      </p>
      <p className="text-sm text-gray-400 mb-4">
        Published on: {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-800 leading-relaxed">{post.content}</p>

      <button className='bg-red-600 text-white font-semibold hover:scale-105 px-3 py-2 rounded-lg mt-2'>Delete post</button>
    </div>
  )
}

export default PostDetail
