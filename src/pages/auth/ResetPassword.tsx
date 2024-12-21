import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";
import axios from "axios";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormInput } from "@/components/auth/FormInput";

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation: Ensure new password matches confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/auth/change_password/",
        {
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
        },
      );

      // Handle API response
      if (response.data.success) {
        setSuccess("Password successfully updated!");
        setTimeout(() => navigate("/login"), 2000); // Redirect after success
      } else {
        throw new Error(response.data.message || "Failed to reset password.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Update your password"
      icon={<Lock className="w-8 h-8 text-white" />}
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

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-2 text-emerald-400">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{success}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Old Password"
          icon={Lock}
          type="password"
          value={formData.oldPassword}
          onChange={(e) =>
            setFormData({ ...formData, oldPassword: e.target.value })
          }
          required
          placeholder="Enter your old password"
        />

        <FormInput
          label="New Password"
          icon={Lock}
          type="password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          required
          placeholder="Enter your new password"
        />

        <FormInput
          label="Confirm New Password"
          icon={Lock}
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
          placeholder="Confirm your new password"
        />

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
              <Lock className="w-5 h-5" />
              <span>Reset Password</span>
            </>
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
};
