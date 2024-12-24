import React, { useEffect, useState } from "react";
import { SessionMetrics } from "../components/Analytics/Metrics/SessionMetrics";
import { SessionTimeline } from "../components/Analytics/Timeline/SessionTimeLine";
// import { SessionNotes } from "../components/Analytics/Notes/SessionNotes";
// import { SessionTags } from "../components/Analytics/Tags/SessionTags";
// import { ParticleBackground } from "../components/Particles/ParticleBackground";
import axios from "axios";
import { SessionAgents } from "@/components/Analytics/Agents/SessionAgents";
// import { useAnalytics } from "../components/Analytics/hooks/useAnalytics";
import { SessionTranscription } from "@/components/Analytics/SessionTranscriptio";
import { axiosConfig } from "./auth/axiosConfig";

interface Metrics {
  totalClients: number;
  weeklySessionCount: number;
  activeSessionCount: number;
  averageSessionDuration: number;
}

interface RawSession {
  id: string;
  clientName: string;
  type: string;
  status: string;
  startTime: string;
  duration?: number;
  tags?: string[];
  notes?: string;
}

interface Session {
  id: string;
  clientName: string;
  type: "video" | "audio";
  status: "completed" | "scheduled" | "in-progress";
  startTime: string;
  duration: number;
  tags: string[];
  notes?: string;
}

export const Analytics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const { sessions } = useAnalytics();
  const [showCreatePlan, setShowCreatePlan] = useState(false);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const metricsResponse = await axios.get(
          "call-session-statistics/",
          axiosConfig
        );
        const sessionsResponse = await axios.get("list-call-sessions/");

        setMetrics(metricsResponse.data);
        setSessions(
          sessionsResponse.data.map((rawSession: RawSession) => ({
            ...rawSession,
            type: rawSession.type as "video" | "audio",
            status: rawSession.status as
              | "completed"
              | "scheduled"
              | "in-progress",
            duration: rawSession.duration || 0,
            tags: rawSession.tags || [],
          }))
        );
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const handleOpen = () => {
    setShowCreatePlan(true);
  };

  return (
    <div className="relative">
      {/* <ParticleBackground /> */}
      <SessionTranscription
        isOpen={showCreatePlan}
        onClose={() => setShowCreatePlan(false)}
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
                  sessions={sessions}
                  isLoading={isLoading}
                />
              </div>
              <div className="space-y-6">
                <SessionAgents />
                {/* <SessionTags /> */}
                {/* <SessionNotes /> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
