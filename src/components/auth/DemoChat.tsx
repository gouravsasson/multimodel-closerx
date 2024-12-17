import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  typing?: boolean;
}

export const DemoChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState("");

  const demoMessages: Message[] = [
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm Emma, your AI sales assistant. How can I help you today?",
    },
    { id: 2, sender: "user", text: "Hi! I'm interested in your premium plan." },
    {
      id: 3,
      sender: "bot",
      text: "Great choice! Our premium plan includes unlimited AI agents, advanced analytics, and priority support. Would you like me to walk you through the features?",
    },
  ];

  useEffect(() => {
    if (currentIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, demoMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900/50 to-purple-900/50">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start space-x-3 ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === "bot"
                    ? "bg-primary/20 text-primary-light"
                    : "bg-accent/20 text-accent-light"
                }`}
              >
                {message.sender === "bot" ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.sender === "bot"
                    ? "bg-white/10 text-white"
                    : "bg-primary/10 text-white/90"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {currentIndex < demoMessages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-white/40"
          >
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-150" />
          </motion.div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12
                     text-white placeholder-white/40 focus:outline-none focus:ring-2
                     focus:ring-primary/50"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary/20 
                         hover:bg-primary/30 rounded-lg transition-all"
          >
            <Send className="w-4 h-4 text-primary-light" />
          </button>
        </div>
      </div>
    </div>
  );
};
