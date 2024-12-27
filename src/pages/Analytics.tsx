import React, { useEffect, useState } from "react";
import axios from "axios";
import { SessionMetrics } from "../components/Analytics/Metrics/SessionMetrics";
import { SessionTimeline } from "../components/Analytics/Timeline/SessionTimeLine";
import { SessionTranscription } from "../components/Analytics/SessionTranscription";
import { axiosConfig } from "./auth/axiosConfig";
import { SessionAgents } from "@/components/Analytics/Agents/SessionAgents";
import { Session } from "../components/Analytics/types";

interface Metrics {
  totalClients: number;
  weeklySessionCount: number;
  activeSessionCount: number;
  averageSessionDuration: number;
}

interface Agent {
  name: string;
  agentCode: string;
  color: string;
}

export const Analytics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [agents, setAgents] = useState<Agent[] | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  const handleAgentClick = (agentCode: string) => {
    console.log("Agent Code:", agentCode);
    const filtered = sessions.filter((session) =>
      session.tags.includes(agentCode),
    );
    console.log("Filtered Sessions:", filtered);
    setFilteredSessions(filtered);
  };

  // Fetch metrics data
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "call-session-statistics/",
          axiosConfig,
        );
        if (response.data.success) {
          const apiMetrics = response.data.response;

          setMetrics({
            totalClients: apiMetrics.total_sessions || 0,
            weeklySessionCount: apiMetrics.sessions_this_week || 0,
            activeSessionCount: apiMetrics.active_agents || 0,
            averageSessionDuration: apiMetrics.average_duration || 0,
          });
        } else {
          setError("Failed to fetch metrics data.");
        }
      } catch (err) {
        setError("An error occurred while fetching metrics data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("agents/", axiosConfig);

        const apiAgents = response.data;
        if (Array.isArray(apiAgents)) {
          const mappedAgents: Agent[] = apiAgents.map(
            (agent: { name: string; agent_code: string; type: string }) => ({
              name: agent.name || "Unknown Agent",
              agentCode: agent.agent_code,
              color:
                agent.type === "Support"
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
            }),
          );
          setAgents(mappedAgents);
        } else {
          setError("Failed to fetch agent data: Invalid response format.");
        }
      } catch (err) {
        setError("An error occurred while fetching agent data.");
        console.error("Fetch Agents Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // Fetch session data with pagination
  useEffect(() => {
    const fetchSessions = async (page: number) => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `list-call-sessions/?page=${page}`,
          axiosConfig,
        );
        if (response.data.status) {
          const apiSessions: Session[] = response.data.data.map(
            (item: {
              id: number;
              first_name: string;
              last_name: string;
              created_date: string;
              duration: number;
              agent_code: string;
              transcription: string;
              summary: string;
            }) => ({
              id: item.id.toString(),
              clientName: `${item.first_name} ${item.last_name}`,
              type: "audio", // Assuming "audio" if type is not provided
              status: "completed", // Assuming "completed" if status is not provided
              startTime: item.created_date,
              duration: Math.ceil(item.duration / 60), // Convert seconds to minutes
              tags: [item.agent_code],
              transcription: item.transcription,
              summary: item.summary,
            }),
          );

          setSessions(apiSessions);
          setTotalPages(response.data.total_pages || 1);
        } else {
          setError("Failed to fetch session data.");
        }
      } catch (err) {
        setError("An error occurred while fetching session data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions(currentPage);
  }, [currentPage]);

  const handleOpen = (session: Session) => {
    setSelectedSession(session);
    setShowCreatePlan(true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="relative">
      <SessionTranscription
        isOpen={showCreatePlan}
        onClose={() => setShowCreatePlan(false)}
        transcription={selectedSession?.transcription || ""}
        summary={selectedSession?.summary || ""}
      />

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 relative inline-block">
            <span className="relative z-10">Analytics Dashboard</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10" />
          </h1>
          <p className="text-white/70">
            Track and analyze your AI agent's performance
          </p>
        </header>

        {error ? (
          <div className="text-center text-red-400 font-semibold">{error}</div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-8">
            <SessionMetrics
              metrics={
                metrics || {
                  totalClients: 0,
                  weeklySessionCount: 0,
                  activeSessionCount: 0,
                  averageSessionDuration: 0,
                }
              }
              isLoading={isLoading}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SessionTimeline
                  onOpen={handleOpen}
                  sessions={
                    filteredSessions.length > 0 ? filteredSessions : sessions
                  }
                  isLoading={isLoading}
                />
              </div>
              <div className="space-y-6">
                <SessionAgents
                  agents={agents || []}
                  onAgentClick={handleAgentClick}
                />
                {filteredSessions.length > 0 && (
                  <button
                    onClick={() => setFilteredSessions([])}
                    className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-white
                       flex items-center space-x-2 transition-all"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-white
                       flex items-center space-x-2 transition-all disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-white
                       flex items-center space-x-2 transition-all disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
