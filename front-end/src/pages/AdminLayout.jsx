import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-[80px] flex">

      <aside
        className={`bg-white w-64 fixed top-[80px] left-0 h-[calc(100vh-80px)] z-30 border-r border-gray-200 shadow-md p-6 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/app/admin/all" className="block text-gray-700 hover:text-indigo-600">🏠 Dashboard</Link>
          <Link to="/app/admin/users" className="block text-gray-700 hover:text-indigo-600">👥 Manage Users</Link>
          <Link to="/app/admin/posts" className="block text-gray-700 hover:text-indigo-600">📝 Manage Posts</Link>
        </nav>
      </aside>

      <div className="lg:hidden fixed top-[90px] left-4 z-40">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl text-indigo-600">
          <FiMenu />
        </button>
      </div>

      <main className="flex-1 lg:ml-64 px-4 pb-12 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
