import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { FormInput } from "@/components/auth/FormInput";
import { axiosConfig2 } from "@/pages/auth/axiosConfig";

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        "auth/change_password/",
        {
          old_password: formData.oldPassword,
          new_password1: formData.newPassword,
          new_password2: formData.confirmPassword,
        },
        axiosConfig2,
      );

      if (response.data.success) {
        setSuccess("Password successfully updated!");
      } else {
        throw new Error(response.data.message || "Failed to reset password.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl p-8 rounded-2xl 
                     border border-white/20 w-full max-w-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-4">
            <h2 className="text-2xl font-semibold text-white">
              Change Password
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-white">
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
              <div className="relative">
                <FormInput
                  label="Old Password"
                  icon={Lock}
                  type={visibility.oldPassword ? "text" : "password"}
                  value={formData.oldPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPassword: e.target.value })
                  }
                  required
                  placeholder="Enter your old password"
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("oldPassword")}
                  className="absolute inset-y-14 right-3 flex items-center text-white/50 hover:text-white/80"
                >
                  {visibility.oldPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <FormInput
                  label="New Password"
                  icon={Lock}
                  type={visibility.newPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  required
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("newPassword")}
                  className="absolute inset-y-14 right-3 flex items-center text-white/50 hover:text-white/80"
                >
                  {visibility.newPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <FormInput
                  label="Confirm New Password"
                  icon={Lock}
                  type={visibility.confirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("confirmPassword")}
                  className="absolute inset-y-14 right-3 flex items-center text-white/50 hover:text-white/80"
                >
                  {visibility.confirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
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
                    <Lock className="w-5 h-5" />
                    <span>Reset Password</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
