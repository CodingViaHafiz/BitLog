// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1000",
  withCredentials: true,
});

export default api;
