import React, { useState } from "react";
import { DomainConfig } from "../components/Agency/DomainConfig";
import { EmailTemplates } from "../components/Agency/EmailTemplates";
import { BillingConfig } from "../components/Agency/BillingConfig";
import { JavaScriptSnippet } from "../components/Agency/JavaScriptSnippet";
import { TabNavigationAgency } from "@/components/Agency/components/TabNavigationAgency";
import ClientPortal from "@/components/Agency/clientPortal/ClientPortal";
import CnameUrl from "@/components/Agency/CnameUrl";
import { useEffect } from "react";
import { axiosConfig } from "./auth/axiosConfig";
import axios from "axios";
import useWhitelableStore from "@/hooks/useWhiteLableS";
import useLoadingStore from "@/hooks/useLoading";
import { motion } from "framer-motion";
// import { ParticleBackground } from "../components/Particles/ParticleBackground";

export const Agency: React.FC = () => {
  const [stripeConnected, setStripeConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("agency"); // Default to 'agency' tab
  const { response, setResponse, resetResponse } = useWhitelableStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  // console.log(response);

  const handleNext = () => {
    if (activeTab === "agency") {
      setActiveTab("dashboard"); // Switch to 'dashboard' tab
    }
  };

  useEffect(() => {
    const getWhitelabel = async () => {
      startLoading();
      try {
        const response = await axios.get(
          `/get-whitelabel/
`,
          axiosConfig,
        );
        if (response.status === 200) {
          setResponse(response.data.response);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching whitelabel data:", error);
      } finally {
        stopLoading();
      }
    };

    getWhitelabel();
  }, []);

  return (
    <>
      <header className="text-center mb-4">
        <TabNavigationAgency activeTab={activeTab} onTabChange={setActiveTab} />
        <h1 className="text-4xl font-bold text-white mb-2 relative inline-block">
          <span className="relative z-10">Agency Dashboard</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10" />
        </h1>
        <p className="text-white/70">
          Configure your white-label settings and manage your plans
        </p>
      </header>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
        >
          <div className="space-y-8">
            {/* Skeleton for Company Name */}
            <div>
              <div className="h-4 w-32 bg-white/10 rounded mb-2"></div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/20 rounded"></div>
                <div className="w-full bg-white/10 border border-white/10 rounded-xl h-12"></div>
              </div>
            </div>

            {/* Skeleton for Logo URL */}
            <div>
              <div className="h-4 w-24 bg-white/10 rounded mb-2"></div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded"></div>
                <div className="w-full bg-white/10 border border-white/10 rounded-xl h-12"></div>
              </div>
            </div>

            {/* Skeleton for Button */}
            <div>
              <div className="w-full bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl h-12"></div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="relative">
          {/* <ParticleBackground /> */}

          <div className="container mx-auto px-4 py-8">
            {/* Conditionally render the content based on activeTab */}
            {activeTab === "agency" && (
              <div className="max-w-4xl mx-auto space-y-8">
                <CnameUrl />
                <DomainConfig />
                <EmailTemplates />
                <BillingConfig
                  onStripeConnect={() => setStripeConnected(true)}
                  isConnected={stripeConnected}
                />
                <JavaScriptSnippet />
              </div>
            )}

            {activeTab === "dashboard" && <ClientPortal />}
          </div>
        </div>
      )}
    </>
  );
};
