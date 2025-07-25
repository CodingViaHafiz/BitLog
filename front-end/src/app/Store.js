import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/authSlice";
import loaderReducer from "../features/loader/loaderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    user: userReducer,
    loader: loaderReducer,
  },
});
