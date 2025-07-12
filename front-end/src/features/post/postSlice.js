import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};
// fetch all posts
export const fetchAllPosts = createAsyncThunk(
  "posts/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/posts/feed", { withCredentials: true });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// fetch all posts for admin
export const fetchAllPostsForAdmin = createAsyncThunk(
  "posts/admin",
  async (_, rejectWithValue) => {
    try {
      const res = await axios.get("/posts/admin/all", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// create a new post thunk
export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/posts/create", postData);
      return res.data.post;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update the post
export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:1000/posts/${id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      console.log("user posts:", res.data);
      return res.data.post;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// delete post
export const deletePost = createAsyncThunk(
  "post/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:1000/posts/${id}`, {
        withCredentials: true,
      });
      return { id, message: res.data.message }; // return the id for reducer to remove from state
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch posts of the logged-in user
export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMyPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/posts/me", { withCredentials: true });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my posts"
      );
    }
  }
);

// post Slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        // state.posts.push(action.payload);
        state.posts = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      // update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        // if (index !== -1) {
        //   state.posts[index] = updatedPost;
        // }
      })
      // Fetch My Posts
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete own post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
