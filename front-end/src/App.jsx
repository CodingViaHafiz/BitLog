
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/HomePage.jsx'
import PostForm from './components/PostForm.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'
import FeedPage from './pages/FeedPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import PostDetail from './pages/PostDetail.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from './features/auth/authSlice.js'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
// import Cookies from "js-cookie"

function App() {
  const { initialized } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!initialized) {
    return <p className="text-center mt-20">Initializing...</p>;
  }

  return (
    <Router>
      <Routes>
        // protected routes
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/postcard" element={<PostForm />} />
            <Route path="/posts/create" element={<CreatePostPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/me" element={<AccountPage />} />
            <Route path="/admin/all" element={<AdminPage />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Route>
        </Route>
        // public routes
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="*" element={<h1>Route Not Found</h1>} /> */}


      </Routes>
    </Router>
  )
}

export default App
