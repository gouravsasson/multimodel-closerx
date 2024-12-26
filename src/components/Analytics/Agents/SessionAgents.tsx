import React from "react"; 
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

interface Agent {
  name: string;
  color: string;
  agentCode: string; // Unique identifier for the agent
}

interface SessionAgentsProps {
  agents: Agent[];
  onAgentClick: (agentCode: string) => void; // Callback function to handle agent clicks
}

export const SessionAgents: React.FC<SessionAgentsProps> = ({
  agents,
  onAgentClick,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Session Agents</h3>

      <div className="space-y-2 max-h-60 overflow-y-auto overflow-x-hidden">
        {agents.map((agent) => (
          <motion.div
            key={agent.agentCode}
            whileHover={{ scale: 1.02, x: 4 }}
            className={`p-3 rounded-xl ${agent.color} cursor-pointer transition-all duration-300`}
            onClick={() => onAgentClick(agent.agentCode)} // Pass agentCode on click
          >
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>{agent.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
