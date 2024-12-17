import React from "react";
import { Camera, Mic, Monitor } from "lucide-react";
import { DemoVideo } from "./DemoVideo";
import { DemoChat } from "./DemoChat";

export const DemoScreen: React.FC = () => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Demo Header */}
      <div className="p-4 border-b border-white/10 bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-white/70 text-sm font-medium">
              AI Assistant Demo
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group">
              <Camera className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group">
              <Mic className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group">
              <Monitor className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="grid grid-rows-[1.75fr,1fr] h-[500px]">
        {/* Video Section */}
        <div className="relative border-b border-white/10">
          <DemoVideo />
        </div>

        {/* Chat Section */}
        <div className="overflow-hidden">
          <DemoChat />
        </div>
      </div>
    </div>
  );
};
