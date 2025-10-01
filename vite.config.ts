import path from "path";
import { defineConfig } from "vite";
import createVuePlugin from "@vitejs/plugin-vue";
import libCss from 'vite-plugin-libcss';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    createVuePlugin(),
    libCss(),
    dts({
      insertTypesEntry: true,
      exclude: ['src/components/**/*', '**/*.vue'],
      include: ['src/index.ts', 'src/interfaces/**/*', 'src/enums/**/*', 'src/types/**/*', 'src/models/**/*', 'src/SnotifyService.ts']
    })
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
