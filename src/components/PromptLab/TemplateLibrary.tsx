import React from "react";
import { TemplateCard } from "./TemplateCard";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const templates = [
  {
    id: "1",
    title: "Customer Support Assistant",
    description:
      "Friendly AI assistant optimized for customer service interactions",
    category: "Support",
    successRate: 98,
    usageCount: 15420,
    prompt: "How can I assist you today?",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Technical Documentation Writer",
    description:
      "Specialized in creating clear and concise technical documentation",
    category: "Documentation",
    successRate: 95,
    usageCount: 8750,
    prompt: "Generate technical documentation for a software module.",
    rating: 4.6,
  },
  {
    id: "3",
    title: "Code Review Assistant",
    description:
      "AI-powered code reviewer with security and best practices focus",
    category: "Development",
    successRate: 92,
    usageCount: 12300,
    prompt: "Review this code snippet for potential issues.",
    rating: 4.7,
  },
];

export const TemplateLibrary: React.FC = () => {
  const handleSelect = (template: (typeof templates)[0]) => {
    console.log("Selected template:", template);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Template Library</h2>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg
             hover:bg-white/10 transition-all"
        >
          <Filter className="w-4 h-4 text-white/70" />
          <span className="text-white/70">Filter</span>
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {templates.map((template, index) => (
          <TemplateCard
            key={index}
            template={template} 
            onSelect={() => handleSelect(template)}           />
        ))}
      </motion.div>
    </div>
  );
};
