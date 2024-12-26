
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);


// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

// import App from "./App.tsx";
// import "./index.css";

// // Export a render function for embedding
// export function render(container: HTMLElement, props?: any) {
//   createRoot(container).render(
//     <StrictMode>
//       <App {...props} />
//     </StrictMode>
//   );
// }

// // Default behavior for development/testing
// if (import.meta.env.MODE === "development") {
//   const rootElement = document.getElementById("root");
//   if (rootElement) {
//     render(rootElement);
//   }
// }
