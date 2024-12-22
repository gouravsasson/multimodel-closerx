import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import axios from "axios";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormInput } from "@/components/auth/FormInput";

export const Login: React.FC = () => {
  const navigate = useNavigate();
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
      // Replace with your actual API endpoint
      const response = await axios.post(
        "http://192.168.1.46:8000/api/auth/user-login/",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Example: Handle API response
      if (response.data.success) {
        // Save token or other user details in localStorage or state management
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

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

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
              className="w-4 h-4 rounded border-white/10 bg-black/20 text-primary
                       focus:ring-white/25 focus:ring-offset-0"
            />
            <span className="text-white/70 text-sm">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-white hover:text-white/80 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl
                   text-white font-medium flex items-center justify-center space-x-2
                   transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                   backdrop-blur-sm border border-white/10"
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

      <div className="mt-6 text-center">
        <p className="text-white/80">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white hover:text-white/80 transition-colors font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
