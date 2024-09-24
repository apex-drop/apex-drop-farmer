import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve("./index.html"),
        "service-worker": resolve("./src/service-worker.js"),
        "content-script": resolve("./src/content-script.js"),
        "tg-web": resolve("./src/tg-web.js"),

        /** Tomarket Content Scripts */
        "tomarket-isolated": resolve(
          "./src/drops/tomarket/tomarket-isolated.js"
        ),
        "tomarket-world": resolve("./src/drops/tomarket/tomarket-world.js"),
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
