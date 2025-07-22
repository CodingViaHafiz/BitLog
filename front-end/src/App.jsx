import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PostForm from './components/PostForm.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import FeedPage from './pages/FeedPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import PostDetail from './pages/PostDetail.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './features/auth/authSlice.js';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Welcome from './pages/Welcome.jsx';
import AdminRoute from './routes/AdminRoute.jsx';
import AdminPosts from './pages/AdminPosts.jsx';
import AdminManageUsers from './pages/AdminManageUsers.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import Loader from './components/Loader.jsx';

function App() {
  const { initialized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!initialized) {
    return <Loader />; // Your custom loader component
  }


  // if you want to keep any page or component centered use this (max-w-7xl mx-auto )

  return (
    <Router>
      <Routes>
        {/* <Loader /> */}
        {/* Public routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<Layout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="postcard" element={<PostForm />} />
            <Route path="posts/create" element={<CreatePostPage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="me" element={<AccountPage />} />
            <Route path="posts/:id" element={<PostDetail />} />
          </Route>
          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="all" element={<AdminPage />} />
              <Route path="users" element={<AdminManageUsers />} />
              <Route path="posts" element={<AdminPosts />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
