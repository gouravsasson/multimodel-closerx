import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import axios from "axios";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormInput } from "@/components/auth/FormInput";
import { useAuth } from "./AuthContext";
// import { getCookie } from "./cookieUtils";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://2xjx88w4-8000.inc1.devtunnels.ms/api/auth/user-login/",
        {
          email: formData.email,
          password: formData.password,
        },
      );

      if (response.data.success) {
        // Save tokens in cookies
        document.cookie = `access_token=${response.data.data.token}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
        document.cookie = `refresh_token=${response.data.refresh_token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
        if (response.data.schema_name) {
          document.cookie = `schema_name=${response.data.schema_name}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
        }
        if (response.data.ghl_registered !== undefined) {
          document.cookie = `ghl_registered=${response.data.ghl_registered}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
        }

        login(); // Update authentication state
        navigate("/"); // Redirect to the home page
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };
  // const ghl = getCookie("ghl_registered");
  // console.log(ghl);
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      icon={<LogIn className="w-8 h-8 text-white" />}
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-2 text-rose-400">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email Address"
          icon={Mail}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder="Enter your email"
        />

        <FormInput
          label="Password"
          icon={Lock}
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          placeholder="Enter your password"
        />

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/10"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </>
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
};
