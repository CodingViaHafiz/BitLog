import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

//login thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:1000/", userData, {
        withCredentials: true, // allows the browser to sends cookies (imp if using sessions or jwt with cookies)
      });
      console.log(res.data.user);
      return res.data.user; //	Sends user data to reducer if login succeeds
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// signUp thunk
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:1000/auth/signup",
        userData,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      return res?.data?.user;
    } catch (error) {
      console.log("Signup error object:", error);
      const message =
        error.response?.data?.message || error.message || "Signup failed";
      return rejectWithValue(message);
    }
  }
);

// logout thunk
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:1000/logout",
        {},
        { withCredentials: true }
      );
      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// fetch user
export const fetchUser = createAsyncThunk(
  "fetch/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:1000/users/my", {
        withCredentials: true,
      });
      console.log("user", res.data);
      return res.data;
    } catch (error) {
      if (error.response?.status === 401) return null;
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ✅ fetchUser with thunkAPI for error handling
// export const fetchUser = createAsyncThunk(
//   "user/fetchUser",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get("http://localhost:1000/users/my", {
//         withCredentials: true,
//       });
//       console.log("✅ user fetched", res.data);
//       return res.data;
//     } catch (error) {
//       if (error.response?.status === 401) return null; // not logged in
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "User fetch failed"
//       );
//     }
//   }
// );

// auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // logout
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      // fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      });
  },
});

export default authSlice.reducer;
