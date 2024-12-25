import React from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

interface Agent {
  name: string;
  // count: number;
  color: string;
}

interface SessionAgentsProps {
  agents: Agent[];
}

export const SessionAgents: React.FC<SessionAgentsProps> = ({ agents }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Session Agents</h3>

      {/* Scrollable container */}
      <div className="space-y-2 max-h-60 overflow-y-auto overflow-x-hidden">
        {agents.map((agent) => (
          <motion.div
            key={agent.name}
            whileHover={{ scale: 1.02, x: 4 }}
            className={`p-3 rounded-xl ${agent.color} cursor-pointer transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>{agent.name}</span>
              </div>
              {/* <span className="px-2 py-0.5 bg-black/20 rounded-full text-xs backdrop-blur-sm">
                {agent.count}
              </span> */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
