import path from "path";
import { defineConfig } from "vite";
import createVuePlugin from "@vitejs/plugin-vue";
import libCss from 'vite-plugin-libcss';

export default defineConfig({
  plugins: [
    createVuePlugin(),
    libCss()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vue3-notification",
      fileName: (format) => `vue3-notification.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  }
});
