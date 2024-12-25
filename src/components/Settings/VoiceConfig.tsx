import React, { useEffect, useState } from "react";
import { Volume2, Mic, ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { VoiceSlider } from "./VoiceSlider";
import { voices } from "./voices";
import axios from "axios";
import { useParams } from "react-router-dom";
import TagsAgent from "./tagsAgent";
import LeadConnectorSelect from "./leadConnecterSelect";
import UpdateFunction from "./updateFunction";
import PopupForm from "./updatefieldform";
import { axiosConfig } from "../../pages/auth/axiosConfig";

// import axios from "axios";
interface VoiceConfigProps {
  onNext: () => void;
}

export const VoiceConfig: React.FC<VoiceConfigProps> = ({ onNext }) => {
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const [temperature, setTemperature] = useState(1);
  // const [pitch, setPitch] = useState(50);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [popUpModal, setPopUpModal] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [updateFnArr, setUpdateFnArr] = useState<Any[]>([]);
  // State for modal visibility
  // State for modal visibility
  // const handleTagsPopUp = () => {
  //   setShowTags(true);
  // };

  const { id } = useParams<{ id: string }>();
  const fetchLeadConnectorStatus = async () => {
    if (!id) return;

    try {
      const response = await axios.get(`/agents/${id}/lead-connector-status`);
      setIsConnected(response.data.isConnected);
    } catch (error) {
      console.error("Error fetching LeadConnector status:", error);
      setIsConnected(false); // Default to not connected in case of error
    }
  };

  useEffect(() => {
    fetchLeadConnectorStatus();
  }, [id]);

  const fetchVoice = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`/agents/${id}/`, axiosConfig);
      if (response.data && response.data) {
        setIsConnected(true);
        setSelectedVoice(response.data.agent_voice);
        setTemperature(response.data.temperature);
        setUpdateFnArr(response.data.update_function);
        // console.log(response.data.agent_voice); // Set the prompt if it exists
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
    }
  };

  useEffect(() => {
    fetchVoice();
  }, [id]);

  const options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
    { id: "4", label: "Option 4" },
    { id: "5", label: "Option 5" },
    { id: "6", label: "Option 6" },
    { id: "9", label: "Option 7" },
    { id: "7", label: "Option 8" },
    { id: "8", label: "Option 9" },
  ];

  const handleChange = (selectedIds: string[]) => {
    // console.log("Selected IDs:", selectedIds);
  };

  const handleSelectVoice = async () => {
    // setIsSubmitting(true);
    try {
      const payload = { agent_voice: selectedVoice, temperature: temperature };

      const response = await axios.patch(
        `/agents/${id}/`,
        payload,
        axiosConfig
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
      <div className="space-y-6 overflow-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-6 h-6 text-primary-light" />
              <h3 className="text-xl font-semibold text-white">
                Voice Settings
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="pr-2">
                {/* Button for showing the modal */}
                <motion.button
                  onClick={() => setPopUpModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all group bg-primary/20 hover:bg-primary/30"
                >
                  <Plus className="w-4 h-4 text-primary-light" />
                  <span className="text-white">Update Customer Fields</span>
                </motion.button>
              </div>
              <div className="pr-2">
                {/* Button for showing the modal */}
                <motion.button
                  onClick={() => setShowFormModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all group bg-primary/20 hover:bg-primary/30"
                >
                  <Plus className="w-4 h-4 text-primary-light" />
                  <span className="text-white">Custom Function</span>
                </motion.button>
              </div>
              <div className="pr-2">
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
              </div>
              <div>
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
              </div>
            </div>
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
              <VoiceSlider
                label="Temprature"
                value={temperature}
                onChange={setTemperature}
              />
              {/* <VoiceSlider label="Pitch" value={pitch} onChange={setPitch} /> */}
            </div>
          </div>
          <div className="w-full bg-transparent rounded-lg pt-4 ">
            {isConnected === null ? (
              <p>Loading LeadConnector status...</p>
            ) : isConnected ? (
              <LeadConnectorSelect
                options={options}
                onChange={(selectedIds) =>
                  console.log("Selected IDs:", selectedIds)
                }
                placeholder="Select Leadconnecter"
              />
            ) : (
              <p>LeadConnector is not connected for this ID</p>
            )}
          </div>
        </div>
      </div>
      {/* Modal for creating tags */}
      {showTagsModal && <TagsAgent onClose={() => setShowTagsModal(false)} />}
      {popUpModal && (
        <PopupForm isOpen={popUpModal} onClose={() => setPopUpModal(false)} />
      )}
      {showFormModal && (
        <UpdateFunction
          onClose={() => setShowFormModal(false)}
          updateFnArr={updateFnArr}
        />
      )}
    </>
  );
};
