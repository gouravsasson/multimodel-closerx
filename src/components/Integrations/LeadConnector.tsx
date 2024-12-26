import React from "react";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { getCookie } from "../../pages/auth/cookieUtils";

export const LeadConnector: React.FC = () => {
  const schemaName = getCookie("schema_name");

  const handleConnect = () => {
    window.location.href =
      window.location.href = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=https://hn4lk1h6-5173.inc1.devtunnels.ms/G-h-l/&state=${schemaName}&client_id=676906277d17de2a8a222a9d-m52bcifq&scope=contacts.write%20contacts.readonly%20calendars.readonly%20calendars.write%20calendars/events.readonly%20calendars/events.write%20locations/customValues.readonly%20locations/customValues.write%20locations/tags.write%20locations.readonly `;
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
          <Link2 className="w-5 h-5 text-primary-light" />
        </div>
        <h2 className="text-xl font-semibold text-white">
          LeadConnector Integration
        </h2>
      </div>

      <div className="text-center py-8">
        <p className="text-white/70 mb-6">
          Connect your LeadConnector account to automatically sync contacts and
          conversations.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConnect}
          className="px-6 py-3 bg-gradient-to-r from-primary/80 to-accent/80 rounded-xl
                   text-white font-medium flex items-center justify-center space-x-2
                   hover:from-primary hover:to-accent transition-all duration-300
                   shadow-lg shadow-primary/25 mx-auto"
        >
          <Link2 className="w-5 h-5" />
          <span>Connect with LeadConnector</span>
        </motion.button>
      </div>
    </div>
  );
};
