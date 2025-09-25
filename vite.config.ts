import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set base path to root for custom domain or username.github.io repo
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    vue(),
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
