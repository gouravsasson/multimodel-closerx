import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SessionTabs } from "../Layout/SessionTabs";
import Summary from "./Transcription/Summary";
import Transcrition from "./Transcription/Transcrition";

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionTranscription: React.FC<CreatePlanModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("transcription");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl p-8 rounded-2xl 
                   border border-white/20 w-full max-w-4xl shadow-2xl  "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-1">
                Session
              </h2>
              {/* <p className="text-white/60 text-sm">
                Agent Transcription
              </p> */}
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </motion.button>
          </div>
          <div>
            <SessionTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="max-w-6xl mx-auto">
              {activeTab === "transcription" && <Transcrition />}
              {activeTab === "summary" && <Summary />}
            </main>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
