import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsultationRoom from "./pages/ConsultationRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsultationRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
