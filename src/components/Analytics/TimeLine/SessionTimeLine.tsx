import React from "react";
import { motion } from "framer-motion";
import { SessionCard } from "./SessionCard";
import type { Session } from "../types";

interface SessionTimelineProps {
  sessions: Session[];
  isLoading: boolean;
  onOpen: (session: Session) => void; // Use the same `Session` type from `types.ts`
}

export const SessionTimeline: React.FC<SessionTimelineProps> = ({
  sessions,
  isLoading,
  onOpen,
}) => {
  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (sessions.length === 0) {
    return <div className="text-white">No recent sessions available.</div>;
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-6">Recent Sessions</h3>

      <div className="space-y-4">
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Pass the session to the onOpen function */}
            <SessionCard openmodal={() => onOpen(session)} session={session} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
