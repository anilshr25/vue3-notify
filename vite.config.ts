import { defineConfig } from "vite";
import createVuePlugin from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vue3-notify",
      fileName: (format) => `vue3-notify.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [createVuePlugin()],
  server: {
    port: 8080,
    fs: {
      // allow: ['..'],
      strict: false,
    },
  },
});