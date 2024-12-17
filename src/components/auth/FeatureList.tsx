import React from "react";
import { motion } from "framer-motion";
import { Bot, Video, MessageSquare, Mic } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-6 h-6 text-emerald-400" />,
    title: "AI-Powered Sales Agents",
    description:
      "Intelligent agents that understand context and drive conversions",
  },
  {
    icon: <Video className="w-6 h-6 text-blue-400" />,
    title: "Video Consultations",
    description: "Face-to-face interactions with AI-enhanced support",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
    title: "Smart Chat Support",
    description: "24/7 automated customer service with human-like responses",
  },
  {
    icon: <Mic className="w-6 h-6 text-rose-400" />,
    title: "Voice Intelligence",
    description: "Natural voice interactions powered by advanced AI",
  },
];

export const FeatureList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col space-y-6"
    >
      {features.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </motion.div>
  );
};

const Feature: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div whileHover={{ x: 4 }} className="flex items-start space-x-4">
    <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
    <div>
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  </motion.div>
);
