import React, { useState } from "react";
import { Volume2, Mic, ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { VoiceSlider } from "./VoiceSlider";
import { voices } from "./voices";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CreateTagsModal, TagsAgent } from "./tagsAgent";
// import axios from "axios";
interface VoiceConfigProps {
  onNext: () => void;
}

export const VoiceConfig: React.FC<VoiceConfigProps> = ({ onNext }) => {
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false); // State for modal visibility
  // const handleTagsPopUp = () => {
  //   setShowTags(true);
  // };

  const { id } = useParams<{ id: string }>();

  const handleSelectVoice = async () => {
    // setIsSubmitting(true);
    try {
      const payload = { agentvoice: selectedVoice, speed, pitch };
      const config = {
        headers: {
          "schema-name": "fe47b368-c563-4aaf-868d-e165d7ff2807",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0OTg2NzgwLCJpYXQiOjE3MzQ3NzA3ODAsImp0aSI6IjJiZjM4ZDJkMmYxMjQ1MThiMmI4YmY4YWIwZTJiOGE5IiwidXNlcl9pZCI6NX0.D2UkUqToZjH7igwW9ucbCQrfJa4v4v58rav0yNDlA94",
        },
      };

      const response = await axios.patch(
        `http://192.168.1.46:8000/api/agents/${id}/update/`,
        payload,
        config
      );

      if (response.status === 200) {
        onNext();
        console.log("Prompt updated successfully:", response.data);
      } else {
        console.error("Failed to update prompt. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-6 h-6 text-primary-light" />
              <h3 className="text-xl font-semibold text-white">
                Voice Settings
              </h3>
            </div>
            {/* Button for showing the modal */}
            <motion.button
              onClick={() => setShowTagsModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all group bg-primary/20 hover:bg-primary/30"
            >
              <Plus className="w-4 h-4 text-primary-light" />
              <span className="text-white">Add Tag</span>
            </motion.button>

            <motion.button
              onClick={handleSelectVoice}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all group ${
                isSubmitting
                  ? "bg-primary/30 cursor-not-allowed"
                  : "bg-primary/20 hover:bg-primary/30"
              }`}
            >
              <span className="text-white">
                {isSubmitting ? "Submitting..." : "Create"}
              </span>
              <ArrowRight className="w-4 h-4 text-primary-light group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTestVoice}
            disabled={loading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              loading
                ? "bg-accent/10 text-white/50 cursor-not-allowed"
                : "bg-accent/20 hover:bg-accent/30 text-white"
            }`}
          >
            {/* <Mic className="w-4 h-4 text-accent-light" /> 
            <span>{loading ? "Testing..." : "Next"}</span>
          </motion.button> */}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-white/80 text-sm">Select Voice</label>
              <div className="grid grid-cols-2 gap-3">
                {voices.map((voice) => (
                  <motion.button
                    key={voice.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`p-4 rounded-xl transition-all ${
                      selectedVoice === voice.id
                        ? "bg-primary/20 border-primary/50 text-white"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    } border`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-medium mb-1">
                        {voice.name}
                      </span>
                      <span className="text-sm opacity-70">
                        {voice.description}
                      </span>
                      <div className="flex items-center mt-2 text-xs space-x-2">
                        <span className="px-2 py-0.5 bg-white/10 rounded-full">
                          {voice.gender}
                        </span>
                        <span className="px-2 py-0.5 bg-white/10 rounded-full">
                          {voice.age}
                        </span>
                        <span className="px-2 py-0.5 bg-white/10 rounded-full">
                          {voice.accent}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <VoiceSlider label="Speed" value={speed} onChange={setSpeed} />
              <VoiceSlider label="Pitch" value={pitch} onChange={setPitch} />
            </div>
          </div>
        </div>
      </div>
      {/* Modal for creating tags */}
      {showTagsModal && <TagsAgent onClose={() => setShowTagsModal(false)} />}
    </>
  );
};
