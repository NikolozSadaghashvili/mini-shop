import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "./", // IMPORTANT → Fixes "Page not found" on Netlify
});
