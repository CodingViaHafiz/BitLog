import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaUsers, FaHome, FaClipboardList } from "react-icons/fa";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/admin/all", label: "Dashboard", icon: <FaHome /> },
    { to: "/admin/users", label: "Manage Users", icon: <FaUsers /> },
    { to: "/admin/posts", label: "Manage Posts", icon: <FaClipboardList /> },
  ];

  return (
    <div className="min-h-screen flex">

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out border-r border-gray-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-emerald-600 tracking-tight">
            Admin Panel
          </h2>
        </div>
        <nav className="p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-medium 
                ${location.pathname === link.to
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-emerald-600"
                }`}
            >
              <span className="text-lg mr-3">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-3xl text-emerald-600 hover:text-emerald-800 transition"
        >
          <FiMenu />
        </button>
      </div>

      <main className="flex-1 lg:ml-64 p-6 pt-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
