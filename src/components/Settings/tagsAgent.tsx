import React, { useState } from "react";
import { motion } from "framer-motion";

interface TagsAgentProps {
  onClose: () => void;
}

const TagsAgent: React.FC<TagsAgentProps> = ({ onClose }) => {
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("Submitted Tag:", tags, "Description:", description);

    // Reset the inputs
    setTags("");
    setDescription("");
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
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl p-8 rounded-2xl 
                   border border-white/20 w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className="space-y-6"> 
          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Tag Name
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., Professional Plan"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
                         text-white placeholder-white/40 focus:outline-none focus:ring-2
                         focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Description of the tag"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
                         text-white placeholder-white/40 focus:outline-none focus:ring-2
                         focus:ring-primary/50"
              rows={4}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full px-6 py-4 bg-gradient-to-r from-primary/80 to-accent/80 rounded-xl
                       text-white font-medium flex items-center justify-center space-x-2 mt-8
                       hover:from-primary hover:to-accent transition-all duration-300
                       shadow-lg shadow-primary/25"
          >
            <span>Add Tag</span>
          </motion.button>
        </div> */}
        <div className="justify-center align-middle">
          <h2>This feature is coming soon </h2>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TagsAgent;
