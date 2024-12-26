import { ArrowRight, Building2, Target } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

function CnameUrl() {
  const [companyName, setCompanyName] = useState("");
  const [logourl, setlogourl] = useState("");

  const handleCompanyDetail = () => {
    console.log("Company details clicked");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
    >
      <div className="space-y-8">
        <div>
          <label className="text-white/90 text-sm block mb-2">
            Company Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter agent name"
              className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
                       text-white placeholder-white/40 focus:outline-none focus:ring-2
                       focus:ring-primary/50"
            />
          </div>
        </div>
        <div>
          <label className="text-white/90 text-sm block mb-2">Logo Url</label>
          <div className="relative">
            <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="url"
              value={logourl}
              onChange={(e) => setlogourl(e.target.value)}
              placeholder="Enter Favicon url"
              className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
                       text-white placeholder-white/40 focus:outline-none focus:ring-2
                       focus:ring-primary/50"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCompanyDetail}
          // disabled={!agentName || !selectedType}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-primary/80 to-accent/80 rounded-xl
                     text-white font-medium flex items-center justify-center space-x-2
                     hover:from-primary hover:to-accent transition-all duration-300
                     shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Add Company Details</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CnameUrl;
