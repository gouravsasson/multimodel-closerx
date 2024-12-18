import { useState, useEffect } from "react";
import type { Metrics } from "../types";

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    totalClients: 156,
    weeklySessionCount: 42,
    activeSessionCount: 3,
    averageSessionDuration: 28,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Simulate fetching updated metrics
    setTimeout(() => {
      setMetrics({
        totalClients: 160,
        weeklySessionCount: 45,
        activeSessionCount: 5,
        averageSessionDuration: 30,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    metrics,
    isLoading,
  };
};
