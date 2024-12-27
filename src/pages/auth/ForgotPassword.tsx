import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, AlertCircle } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormInput } from "@/components/auth/FormInput";
import { ResetEmailSent } from "@/components/auth/ResetEmailSent";
import { axiosConfig3 } from "./axiosConfig";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Make API request using Axios
      const response = await axios.post(
        "auth/request-email/",
        {
          email,
        },
        axiosConfig3,
      );

      if (response.status === 200) {
        setEmailSent(true);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Failed to send reset email. Please try again.",
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return <ResetEmailSent email={email} />;
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="We'll send you instructions to reset your password"
      icon={<Mail className="w-8 h-8 text-white" />}
    >
      <Link
        to="/login"
        className="inline-flex items-center space-x-2 text-white/70 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to login</span>
      </Link>

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          disabled={isLoading}
        />

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading || !email}
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
              <span>Send Reset Instructions</span>
            </>
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
};
