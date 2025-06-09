import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set base path for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/farruh-folio-wave/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Disable source maps in production to avoid eval
    sourcemap: mode !== 'production',
    // Use esbuild minifier (default, no eval)
    minify: 'esbuild',
  },
}));
