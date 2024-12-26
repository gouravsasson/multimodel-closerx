import React, { useState } from "react";
import { motion } from "framer-motion";

interface ImportContentProps {
  onClose: () => void;
}

const ImportContentDialog: React.FC<ImportContentProps> = ({ onClose }) => {
  const [provider, setProvider] = useState("");
  const [activity, setActivity] = useState("");
  const [customFieldValue, setCustomFieldValue] = useState("");
  const [evaluateOn, setEvaluateOn] = useState("");
  const [promptContent, setPromptContent] = useState(
    "Create a sleek and modern landing page design for a tech startup, featuring a hero section with a call-to-action button, client testimonials, and a pricing table. Use a minimalistic style with a blue and white color palette."
  );

  const handleImportContent = () => {
    console.log({
      provider,
      activity,
      customFieldValue,
      evaluateOn,
      promptContent,
    });

    // Reset the inputs
    setProvider("");
    setActivity("");
    setCustomFieldValue("");
    setEvaluateOn("");
    setPromptContent("");

    // Close the modal
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="text-white text-center font-extrabold">
        <h2>This Feature is coming soon</h2>
      </div>
      {/* 
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900/95 w-[80%]  to-purple-900/95 backdrop-blur-xl p-8 rounded-2xl 
                   border border-white/20   shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
       <div className="space-y-6">
        {/*    <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/90 text-sm font-medium block mb-2">
                Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
                           text-white placeholder-white/40 focus:outline-none focus:ring-2
                           focus:ring-primary/50"
              >
                <option value="">Select Provider</option>
                <option value="Provider1">Provider1</option>
                <option value="Provider2">Provider2</option>
              </select>
            </div>
            <div>
              <label className="text-white/90 text-sm font-medium block mb-2">
                Activity
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
                           text-white placeholder-white/40 focus:outline-none focus:ring-2
                           focus:ring-primary/50"
              >
                <option value="">Select Activity</option>
                <option value="Activity1">Activity1</option>
                <option value="Activity2">Activity2</option>
              </select>
            </div>
          </div> 

          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Custom Field Value
            </label>
            <input
              type="text"
              value={customFieldValue}
              onChange={(e) => setCustomFieldValue(e.target.value)}
              placeholder="Enter value"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
                         text-white placeholder-white/40 focus:outline-none focus:ring-2
                         focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Evaluate On
            </label>
            <select
              value={evaluateOn}
              onChange={(e) => setEvaluateOn(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
                         text-white placeholder-white/40 focus:outline-none focus:ring-2
                         focus:ring-primary/50"
            >
              <option value="">Select Evaluation</option>
              <option value="Option1">Contact First Name</option>
              <option value="Option2">Contact Last Name</option>
              <option value="Option2">Contact Email</option>
              <option value="Option3">Contact Phone</option>

            </select>
          </div>
          {/* {{contact.first_name}}
              {{contact.last_name}}
              {{contact.email}}
              {{contact.phone}} 
          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Prompt Content
            </label>
            <textarea
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
              placeholder="Enter prompt content"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
                         text-white placeholder-white/40 focus:outline-none focus:ring-2
                         focus:ring-primary/50"
              rows={4}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleImportContent}
            className="w-full px-6 py-4 bg-gradient-to-r from-primary/80 to-accent/80 rounded-xl
                       text-white font-medium flex items-center justify-center space-x-2 mt-8
                       hover:from-primary hover:to-accent transition-all duration-300
                       shadow-lg shadow-primary/25"
          >
            <span>Import Content</span>
          </motion.button>
        </div>
      </motion.div>
       */}
    </motion.div>
  );
};

export default ImportContentDialog;
