import React from "react";
import { Users, Clock, Calendar, Video } from "lucide-react";
import { MetricCard } from "./MetricCard";
import type { Metrics } from "../types";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  change: string;
  trend: "up" | "down" | "neutral"; // Restricting to specific string literals
  isLoading: boolean;
}

interface SessionMetricsProps {
  metrics: Metrics;
  isLoading: boolean;
}

export const SessionMetrics: React.FC<SessionMetricsProps> = ({
  metrics,
  isLoading,
}) => {
  const metricCards: MetricCardProps[] = [
    {
      icon: <Users className="w-5 h-5" />,
      label: "Total Sessions",
      value: metrics.totalClients,
      change: "+12%",
      trend: "up",
      isLoading,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Avg. Session Duration",
      value: metrics.averageSessionDuration,
      change: "-5%",
      trend: "down",
      isLoading,
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Sessions This Week",
      value: metrics.weeklySessionCount,
      change: "+8%",
      trend: "up",
      isLoading,
    },
    {
      icon: <Video className="w-5 h-5" />,
      label: "Active Agent",
      value: metrics.activeSessionCount,
      change: "0%",
      trend: "neutral",
      isLoading,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};
