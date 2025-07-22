import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/auth": {
      //   target: "http://localhost:1000",
      //   changeOrigin: true,
      // },
    },
    // historyApiFallback: true, // add this line
  },
  optimizeDeps: {
    include: [
      "tinymce/tinymce",
      "tinymce/icons/default",
      "tinymce/themes/silver",
    ],
  },
});
