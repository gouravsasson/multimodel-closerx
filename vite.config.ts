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

import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  // Conditional builds based on mode or environment variable
  if (mode === "widget") {
    // Widget-specific build
    return {
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      build: {
        lib: {
          entry: path.resolve(__dirname, "src/widget.tsx"), // Widget entry point
          name: "ReactWidget",
          fileName: "react-widget",
          formats: ["iife"], // IIFE format for embedding
        },
        rollupOptions: {
          external: ["react", "react-dom"], // Externalize dependencies
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
    };
  }

  // Default main application build
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist-app", // Directory for app build output
      rollupOptions: {
        // Customize Rollup for the main app
        input: path.resolve(__dirname, "index.html"), // Main app entry point
      },
    },
  };
});
