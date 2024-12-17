import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      process: "process/browser",
    },
  },
  define: {
    "process.env": {}, 
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.tsx'), 
      name: 'ReactWidget',
      fileName: 'react-widget',
      formats: ['iife'], 
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});