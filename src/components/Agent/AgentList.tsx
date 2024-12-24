import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Agent, AgentType } from "./types";
import { axiosConfig } from "./utils/axiosConfig";

interface AgentListProps {
  getAgentTypeInfo: (typeId: string) => AgentType | undefined;
}

export const AgentList: React.FC<AgentListProps> = ({ getAgentTypeInfo }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/agents/", axiosConfig);
        const agentsArray = Array.isArray(response.data) ? response.data : [];
        setAgents(agentsArray);
      } catch (err) {
        setError("Failed to fetch agents. Please try again later.");
        console.error("Error fetching agents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const toggleStatus = async (agentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      await axios.patch(
        `/agents/${agentId}/`,
        { status: newStatus },
        axiosConfig
      );
      setAgents((prevAgents) =>
        prevAgents.map((agent) =>
          agent.agent_code === agentId ? { ...agent, status: newStatus } : agent
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-blue-500">Loading agents...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid gap-4">
      {agents.length > 0 ? (
        agents.map((agent) => {
          console.log(agent);
          const typeInfo = getAgentTypeInfo(agent.type);
          return (
            <motion.div
              key={agent.agent_code}
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10
                         hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${typeInfo?.iconColor}`}>
                    {typeInfo?.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {agent.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-white/60">{typeInfo?.name}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full" />
                      <span className="text-white/60">
                        Created{" "}
                        {new Date(agent.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                      agent.status.toLowerCase() === "active"
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-green-300"
                        : "bg-red-500/20 text-red-400"
                    }`}
                    onClick={() => toggleStatus(agent.agent_code, agent.status)}
                  >
                    {agent.status}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/agent/${agent.agent_code}`)}
                    className="p-2 hover:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100
                             transition-all"
                  >
                    <Edit2 className="w-4 h-4 text-white/40 hover:text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })
      ) : (
        <div className="text-center text-gray-400">No agents available.</div>
      )}
    </div>
  );
};
