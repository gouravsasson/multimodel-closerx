import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsultationRoom from "./pages/ConsultationRoom";
import { AgentConfig } from "./pages/AgentConfig";
import { CreateAgent } from "./pages/CreateAgent";
import { Analytics } from "./pages/Analytics";
import { Agency } from "./pages/Agency";
// import Agency from "./pages/Agency";
import { Integrations } from "./pages/Integrations";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/auth/Login";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { Root } from "./root/Root";
import ConsultationRoot from "./root/ConsultationRoot";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import Home from "./stripe/Home";
import { AuthProvider } from "./pages/auth/AuthContext";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Redirect from "./stripe/Redirect";

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} /> */}

          {/* Protected Routes */}
          <Route
            element={
              // <ProtectedRoute>
                <Root />
              // </ProtectedRoute>
            }
          >
            <Route path="/" element={<CreateAgent />} />
            <Route path="/agent/:id" element={<AgentConfig />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/agency" element={<Agency />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/redirect" element={<Redirect />} />
          </Route>
          {/* <Route
            element={
              // <ProtectedRoute>
                <ConsultationRoot />
              // </ProtectedRoute>
            }
          >
            <Route path="/consultation" element={<ConsultationRoom />} />
          </Route> */}
        </Routes>
      </Router>
    // </AuthProvider>
  );
}

export default App;
