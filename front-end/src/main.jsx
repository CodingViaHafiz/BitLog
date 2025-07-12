import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/Store.js'
import { Provider } from "react-redux"
import axios from 'axios'
// In main.jsx or a config file
axios.defaults.baseURL = "http://localhost:1000";
axios.defaults.withCredentials = true;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
