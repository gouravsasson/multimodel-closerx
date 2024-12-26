import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <Search className="w-5 h-5 text-[#8B8A9B] absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-purple-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search clients by name, email, or company..."
        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#8B8A9B] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 shadow-lg focus:shadow-purple-500/20"
      />
    </div>
  );
}
