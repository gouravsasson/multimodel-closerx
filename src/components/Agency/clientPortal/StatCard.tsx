import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  change: number;
}

export function StatCard({ icon: Icon, value, label, change }: StatCardProps) {
  return (
    <div className="bg-[#2D2B3F]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#3D3B54] hover:shadow-purple-500/10 transition-all duration-200 group">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-[#3D3B54]/50 group-hover:bg-purple-500/20 transition-colors duration-200">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <span
          className={`text-sm ${change > 0 ? "text-emerald-400" : "text-red-400"}`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      </div>
      <div className="text-2xl font-bold mb-1 text-white">{value}</div>
      <div className="text-[#8B8A9B] text-sm">{label}</div>
    </div>
  );
}
