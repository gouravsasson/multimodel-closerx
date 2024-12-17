import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SessionMetrics } from "../components/Analytics/Metrics/SessionMetrics";
import { SessionTimeline } from "@/components/Analytics/Timeline/SessionTimeline";
import { SessionNotes } from "../components/Analytics/Notes/SessionNotes";
import { SessionTags } from "../components/Analytics/Tags/SessionTags";
import { ParticleBackground } from "../components/Particles/ParticleBackground";
import axios from "axios";

interface Metrics {
  sessionsCount: number;
  avgSessionTime: number;
  performance: number;
  totalClients: number;
}

interface Session {
  id: string;
  title: string;
  timestamp: string;
}

export const Analytics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const metricsResponse = await axios.get("https://api.example.com/metrics");
        const sessionsResponse = await axios.get("https://api.example.com/sessions");

        setMetrics(metricsResponse.data);
        setSessions(sessionsResponse.data);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="relative">
      <ParticleBackground />

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
          <div className="text-center text-red-400 font-semibold">
            {error}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-8">
            <SessionMetrics metrics={metrics} isLoading={isLoading} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SessionTimeline sessions={sessions} isLoading={isLoading} />
              </div>
              <div className="space-y-6">
                <SessionTags />
                <SessionNotes />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Updated SessionMetrics.tsx to handle null safely
interface SessionMetricsProps {
  metrics: Metrics | null;
  isLoading: boolean;
}

export const SessionMetrics: React.FC<SessionMetricsProps> = ({ metrics, isLoading }) => {
  if (isLoading) {
    return <div className="text-white text-center">Loading metrics...</div>;
  }

  if (!metrics) {
    return <div className="text-white text-center">No metrics available</div>;
  }

  return (
    <div className="bg-white/5 p-6 rounded-lg">
      <h2 className="text-white text-lg mb-4">Session Metrics</h2>
      <div className="text-white">
        <p>Total Clients: {metrics.totalClients}</p>
        <p>Total Sessions: {metrics.sessionsCount}</p>
        <p>Average Session Time: {metrics.avgSessionTime} mins</p>
        <p>Performance: {metrics.performance}%</p>
      </div>
    </div>
  );
};