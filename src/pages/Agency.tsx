// import React, { useState } from "react";
// import { DomainConfig } from "../components/Agency/DomainConfig";
// import { EmailTemplates } from "../components/Agency/EmailTemplates";
// import { BillingConfig } from "../components/Agency/BillingConfig";
// import { JavaScriptSnippet } from "../components/Agency/JavaScriptSnippet";
// import { TabNavigationAgency } from "@/components/Agency/components/TabNavigationAgency";
// import ClientPortal from "@/components/Agency/clientPortal/ClientPortal";
// // import { ParticleBackground } from "../components/Particles/ParticleBackground";

// export const Agency: React.FC = () => {
//   const [stripeConnected, setStripeConnected] = useState(false);
//   const [activeTab, setActiveTab] = useState("agency");
//   // console.log(activeTab);
//   const handleNext = () => {
//     if (activeTab === "agency") {
//       setActiveTab("dashboard");
//     }
//   };

//   return (
//     <div className="relative">
//       {/* <ParticleBackground /> */}

//       <div className="container mx-auto px-4 py-8">
//         <header className="text-center mb-4">
//           <TabNavigationAgency activeTab={activeTab} onTabChange={setActiveTab} />
//           <h1 className="text-4xl font-bold text-white mb-2 relative inline-block">
//             <span className="relative z-10">Agency Dashboard</span>
//             {/* <TabNavigationAgency activeTab={activeTab} onTabChange={setActiveTab} /> */}

//             <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10" />
//           </h1>
//           <p className="text-white/70">
//             Configure your white-label settings and manage your plans
//           </p>
//         </header>

//         <div className="max-w-4xl mx-auto space-y-8">
//           <DomainConfig />
//           <EmailTemplates />
//           <BillingConfig
//             onStripeConnect={() => setStripeConnected(true)}
//             isConnected={stripeConnected}
//           />
//           <JavaScriptSnippet />
//         </div>
//       </div>
//     </div>
//     <ClientPortal/>
//   );
// };
import React, { useState } from "react";
import { DomainConfig } from "../components/Agency/DomainConfig";
import { EmailTemplates } from "../components/Agency/EmailTemplates";
import { BillingConfig } from "../components/Agency/BillingConfig";
import { JavaScriptSnippet } from "../components/Agency/JavaScriptSnippet";
import { TabNavigationAgency } from "@/components/Agency/components/TabNavigationAgency";
import ClientPortal from "@/components/Agency/clientPortal/ClientPortal";
import CnameUrl from "@/components/Agency/CnameUrl";
// import { ParticleBackground } from "../components/Particles/ParticleBackground";

export const Agency: React.FC = () => {
  const [stripeConnected, setStripeConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("agency"); // Default to 'agency' tab

  const handleNext = () => {
    if (activeTab === "agency") {
      setActiveTab("dashboard"); // Switch to 'dashboard' tab
    }
  };

  return (
    <div className="relative">
      {/* <ParticleBackground /> */}

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-4">
          <TabNavigationAgency
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <h1 className="text-4xl font-bold text-white mb-2 relative inline-block">
            <span className="relative z-10">Agency Dashboard</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10" />
          </h1>
          <p className="text-white/70">
            Configure your white-label settings and manage your plans
          </p>
        </header>

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
  );
};
