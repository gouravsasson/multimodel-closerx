import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsultationRoom from "./pages/ConsultationRoom";
import { AgentConfig } from "./pages/AgentConfig";
import { CreateAgent } from "./pages/CreateAgent";
import { Analytics } from "./pages/Analytics";
import { Agency } from "./pages/Agency";
import { Integrations } from "./pages/Integrations";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/auth/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Root } from "./root/Root";
import ConsultationRoot from "./root/ConsultationRoot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route element={<Root />}>
          <Route path="/" element={<CreateAgent />} />
          <Route path="/agent/:id" element={<AgentConfig />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/agency" element={<Agency />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/profile" element={<Profile />} />
          
          
        </Route>
        <Route element={<ConsultationRoot/>}>
           <Route path="/consultation" element={<ConsultationRoom />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
