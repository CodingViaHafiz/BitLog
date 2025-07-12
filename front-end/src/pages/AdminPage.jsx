import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '../features/post/postSlice';
import { Link } from 'react-router-dom';
import { fetchUser } from '../features/auth/authSlice';


const AdminPage = () => {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector((state) => state.posts);
  const { user, loading: userLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser())
    }
  }, [dispatch])

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchAllPosts())
    }
  }, [dispatch, user?.role])

  if (userLoading) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-500">Loading user info...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-500">Unauthorized. Please log in.</p>
      </div>
    );
  }

  if (user.role !== "admin") {
    return <p className='text-center text-red-600'>Access denied: admin only</p>
  }
  return (
    <div>
      <div className="w-full max-w-3xl mx-auto my-12 p-6 border border-emerald-300 rounded-2xl shadow-lg bg-transparent">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-600 underline decoration-dashed  text-center">
          Admin Dashboard
        </h1>
        <h2 className='text-3xl text-blue-600'> welcome{user.name}</h2>
        <p className="mt-4 text-gray-500 text-center text-sm sm:text-base">
          Welcome to your control panel — manage users, content, and settings with ease.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
          {Array.isArray(posts) && posts.map((post) => (
            <Link
              to={`/posts/${post._id}`}
              key={post._id}
              className="bg-white shadow-md rounded-2xl p-6 w-full sm:w-full md:w-[48%] lg:w-[31%] transition-transform hover:scale-[1.02] border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-500 text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded-full shadow">
                  {post.author?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{post.author?.name}</p>
                  <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{post.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-4">{post.content}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>

  )
}

export default AdminPage
