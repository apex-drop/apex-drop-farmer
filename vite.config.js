import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./index.html"),
        "service-worker": path.resolve(__dirname, "./src/service-worker.js"),
        "content-script": path.resolve(__dirname, "./src/content-script.js"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [react(), imagetools()],
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
});
