import { ReactNode } from "react";

export interface Agent {
  agent_code: string;
  name: string;
  type: string;
  prompt: string | null;
  status: string;
  agent_voice: string | null;
  speed: number;
  pitch: number;
  created_at: string;
  updated_at: string;
}

export interface AgentType {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  features: string[];
  iconColor: string;
}
