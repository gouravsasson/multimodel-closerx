import React from "react";
import { motion } from "framer-motion";
import { DemoScreen } from "./DemoScreen";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  icon,
}) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Left Side - Auth Form */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center p-8">
        {/* Background gradients */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-50">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
            </div>
          </div>
        </div>

        {/* Auth Form Container - Added min-width and max-width */}
        <div className="relative w-full min-w-[380px] max-w-[480px] mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block"
            >
              <div className="p-3 bg-white/10 backdrop-blur-xl rounded-xl inline-block mb-2">
                {icon}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <p className="text-white/80">{subtitle}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20"
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Interactive Demo */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          {/* Gradient Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950" />

          {/* Animated Gradient Orbs */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-8 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl"
            />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-white/10 opacity-10" />

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20" />
            <DemoScreen />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
