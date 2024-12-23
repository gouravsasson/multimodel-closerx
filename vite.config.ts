// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, 'src/widget.tsx'),
//       name: 'ReactWidget',
//       fileName: 'react-widget',
//       formats: ['iife'],
//     },
//     rollupOptions: {
//       external: ['react', 'react-dom'],
//       output: {
//         globals: {
//           react: 'React',
//           'react-dom': 'ReactDOM',
//         },
//       },
//     },
//   },
// });
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";

// export default defineConfig(({ mode }) => {
//   const commonConfig = {
//     plugins: [react()],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//   };

//   if (mode === "widget") {
//     return {
//       ...commonConfig,
//       build: {
//         lib: {
//           entry: path.resolve(__dirname, "src/widget.tsx"),
//           name: "ReactWidget",
//           fileName: "react-widget",
//           formats: ["iife"],
//         },
//         rollupOptions: {
//           external: ["react", "react-dom"],
//           output: {
//             globals: {
//               react: "React",
//               "react-dom": "ReactDOM",
//             },
//           },
//         },
//       },
//     };
//   }

//   return {
//     ...commonConfig,
//     build: {
//       outDir: "dist/app",
//     },
//   };
// });

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});