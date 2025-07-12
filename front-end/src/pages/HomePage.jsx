import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../features/post/postSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts)
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch])
  console.log("Posts:", posts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">Explore blogs</h1>
      {loading && <p className="text-center text-lg">Loading posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div>
        {Array.isArray(posts) && posts.map((post) => (
          <div
            key={post?._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-purple-700 mb-2">{post?.title}</h2>
            {/* {console.log(post.title)} */}
            {/* <div>
              <p>{message}</p>
            </div> */}
            <p className="text-sm text-gray-600 mb-3">
              By {post?.author?.name || "Unknown"} -{" "}
              {new Date(post?.createdAt).toLocaleDateString()}
            </p>
            <p className='text-gray-700'>{post?.content?.slice(0, 120)}...</p>
          </div>
        ))}
      </div>
    </div >
  )
}

export default HomePage
