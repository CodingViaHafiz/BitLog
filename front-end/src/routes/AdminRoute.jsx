import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const { user, loading } = useSelector((state) => state.auth)
  if (loading) {
    return <p className='text-red-600 text-center mt-10'>Loading ....</p>
  }
  if (!user || user.role !== "admin") {
    <Navigate to={"/login"} />
  }
  return <Outlet />
}

export default AdminRoute
