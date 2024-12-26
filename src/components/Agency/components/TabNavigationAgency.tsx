import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BellElectric } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: "agency", label: "Agency", icon: <BellElectric className="w-5 h-5" /> },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
];

export const TabNavigationAgency: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="relative flex justify-center mb-8 h-full'">
      <motion.div
        className="flex space-x-2 p-1 bg-white/10 backdrop-blur-lg rounded-xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200
              ${activeTab === tab.id ? "text-white" : "text-white/60 hover:text-white/90"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 backdrop-blur-sm rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.icon}</span>
            <span className="relative z-10 font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </nav>
  );
};

export default TabNavigationAgency;