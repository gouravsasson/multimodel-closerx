import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "./AuthLayout";

interface ResetEmailSentProps {
  email: string;
}

export const ResetEmailSent: React.FC<ResetEmailSentProps> = ({ email }) => {
  return (
    <AuthLayout
      title="Check Your Email"
      subtitle="We've sent you instructions to reset your password"
      icon={<Mail className="w-8 h-8 text-white" />}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 
                   rounded-full mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </motion.div>

        <p className="text-white/80 mb-2">
          We've sent a password reset link to:
        </p>
        <p className="text-white font-medium mb-6">{email}</p>

        <div className="text-white/60 text-sm space-y-4">
          <p>
            Didn't receive the email? Check your spam folder or
            <button className="text-white ml-1 hover:underline">
              try another email address
            </button>
          </p>
          <p>The link will expire in 1 hour for security reasons.</p>
        </div>

        <div className="mt-8">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
