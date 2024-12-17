import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsultationRoom from "./pages/ConsultationRoom";
import { AgentConfig } from "./pages/AgentConfig";
import { CreateAgent } from "./pages/CreateAgent";
import { Analytics } from "./pages/Analytics";
import { Agency } from "./pages/Agency";
import { Navigation } from "./components/Layout/Navigation";
import { Integrations } from "./pages/Integrations";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<CreateAgent />} />
            <Route path="/agent/:id" element={<AgentConfig />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/agency" element={<Agency />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/consultation" element={<ConsultationRoom />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
