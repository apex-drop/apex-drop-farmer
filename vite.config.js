import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { imagetools } from "vite-imagetools";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./index.html"),
        "notpixel-sanbox": path.resolve(__dirname, "./notpixel-sandbox.html"),
        "service-worker": path.resolve(__dirname, "./src/service-worker.js"),
        "content-script-main": path.resolve(
          __dirname,
          "./src/content-script-main.js"
        ),
        "content-script-isolated": path.resolve(
          __dirname,
          "./src/content-script-isolated.js"
        ),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [react(), imagetools(), nodePolyfills()],
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
});
