import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
        "service-worker": resolve(__dirname, "./src/service-worker.js"),
        "content-script": resolve(__dirname, "./src/content-script.js"),

        // Tomarket Content Scripts
        "tomarket-isolated": resolve(
          __dirname,
          "./src/drops/tomarket/tomarket-isolated.js"
        ),
        "tomarket-world": resolve(
          __dirname,
          "./src/drops/tomarket/tomarket-world.js"
        ),
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
