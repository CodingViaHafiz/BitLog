import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../auth/authSlice";
const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
