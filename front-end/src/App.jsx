
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
import Cookies from "js-cookie"

function App() {
  // const { initialized } = useSelector((state) => state.auth);
  // if (!initialized) {
  //   return <p className='text-center mt-20'>Initializing ...</p>
  // }

  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(fetchUser())
    }
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/postcard" element={<PostForm />} />
        <Route path="/posts/create" element={<CreatePostPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/me" element={<AccountPage />} />
        <Route path="/admin/all" element={<AdminPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />



        {/* <Route path="*" element={<h1>Route Not Found</h1>} /> */}


      </Routes>
    </Router>
  )
}

export default App
