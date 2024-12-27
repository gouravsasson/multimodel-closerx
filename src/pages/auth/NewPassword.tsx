import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormInput } from "@/components/auth/FormInput";
import { axiosConfig3 } from "./axiosConfig";

export const NewPassword: React.FC = () => {
  const { uidb64, token } = useParams(); // Extract URL parameters
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate the link using GET API
    const validateResetLink = async () => {
      try {
        const response = await axios.get(
          `auth/password-reset/${uidb64}/${token}/`,
          axiosConfig3,
        );
        if (response.status === 200) {
          setIsValid(true);
        }
      } catch (err) {
        console.log(err);
        setError("Invalid or expired reset link.");
      }
    };

    validateResetLink();
  }, [uidb64, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "auth/password-reset-complete/",
        {
          uidb64,
          token,
          password,
        },
        axiosConfig3,
      );

      if (response.status === 200) {
        navigate("/login"); // Redirect to login after successful reset
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Failed to reset the password. Please try again.",
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValid) {
    return (
      <AuthLayout
        title="Reset Password"
        subtitle="Password reset link validation"
        icon={<AlertCircle className="w-8 h-8 text-red-500" />}
      >
        <div className="text-center text-red-500">
          {error || "Validating link..."}
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password below"
      icon={<Mail className="w-8 h-8 text-white" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <FormInput
            label="New Password"
            icon={Mail}
            type={passwordVisible ? "text" : "password"} // Toggle between "text" and "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your new password"
            disabled={isLoading}
          />
          {/* Toggle Visibility Button */}
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-14 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {passwordVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

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

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading || !password}
          className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl
                   text-white font-medium flex items-center justify-center space-x-2
                   transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                   backdrop-blur-sm border border-white/10"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Mail className="w-5 h-5" />
              <span>Set New Password</span>
            </>
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
};
