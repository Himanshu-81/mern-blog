import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-blog-kappa-ten.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
