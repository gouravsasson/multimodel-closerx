import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, Volume2, Sparkles, Shield, Zap } from "lucide-react";

export const DemoVideo: React.FC = () => {
  const [currentEffect, setCurrentEffect] = useState(0);
  const effects = ["analyzing", "processing", "responding"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEffect((prev) => (prev + 1) % effects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900/50 to-purple-900/50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
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
      </div>

      {/* AI Agent Avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="relative"
        >
          {/* Glowing background effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse" />

          {/* Avatar container */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent p-1">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
              <Bot className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Orbiting Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 p-2 bg-emerald-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2 bg-blue-500/20 rounded-full">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-purple-500/20 rounded-full">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Status Effects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={effects[currentEffect]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm 
                   rounded-full border border-white/20"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white/80 text-sm">
              {effects[currentEffect].charAt(0).toUpperCase() +
                effects[currentEffect].slice(1)}
              ...
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Voice Visualization */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-1">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: Math.random() * 32 + 8,
              transition: {
                duration: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="w-1 bg-gradient-to-t from-primary/60 to-accent/60 rounded-full"
          />
        ))}
      </div>

      {/* Status Indicators */}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/20 rounded-full backdrop-blur-sm">
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-400">AI Speaking</span>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500/20 rounded-full backdrop-blur-sm">
          <Mic className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-blue-400">Listening</span>
        </div>
      </div>
    </div>
  );
};
