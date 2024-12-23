import React, { useState } from "react";
import { motion } from "framer-motion";

interface TagsAgentProps {
  onClose: () => void;
}

const UpdateFunction: React.FC<TagsAgentProps> = ({ onClose }) => {
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [isValidJson, setIsValidJson] = useState(true);

  const validateJson = (value: string) => {
    try {
      JSON.parse(value);
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDescription(value);
    validateJson(value);
  };

  const handleSubmit = () => {
    if (isValidJson) {
      console.log("Submitted Tag:", tags, "JSON Schema:", description);

      // Reset the inputs
      setTags("");
      setDescription("");
      setIsValidJson(true);
      // Close the modal
      onClose();
    }
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
                   border border-white/20 w-full max-w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Name
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
              Url
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
              Enter JSON Schema
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="e.g., Enter JSON Schema here"
              className={`w-full bg-black/40 border ${
                isValidJson ? "border-white/10" : "border-red-500"
              } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                isValidJson ? "focus:ring-primary/50" : "focus:ring-red-500"
              }`}
              rows={4}
            />
            {!isValidJson && (
              <p className="text-red-500 text-sm mt-2">
                Please enter a valid JSON schema.
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!isValidJson}
            className={`w-full px-6 py-4 rounded-xl text-white font-medium flex items-center justify-center space-x-2 mt-8
                       transition-all duration-300 shadow-lg shadow-primary/25 ${
                         isValidJson
                           ? "bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent"
                           : "bg-gray-600 cursor-not-allowed"
                       }`}
          >
            <span>Format JSON</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UpdateFunction;
