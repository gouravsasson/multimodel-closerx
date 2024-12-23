// import React, { useState } from "react";
// import { ArrowRight, BookTemplate } from "lucide-react";
// import { motion } from "framer-motion";
// import { TemplateModal } from "./TemplateModal";
// import type { Template } from "./templates";
// import { templates } from "./templates";
// import axios from "axios";

// interface EditorProps {
//   onNext: () => void;
// }

// export const Editor: React.FC<EditorProps> = ({ onNext }) => {
//   const [prompt, setPrompt] = useState("");
//   const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
//   // const [templates, setTemplates] = useState<Template[]>([]);
//   const [loading, setLoading] = useState(false);

//   // const fetchTemplates = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.get("https://api.example.com/templates");
//   //     setTemplates(response.data);
//   //   } catch (error) {
//   //     console.error("Error fetching templates:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleOpenTemplateModal = () => {
//     // fetchTemplates();
//     setIsTemplateModalOpen(true);
//   };

//   const handleTemplateSelect = (templatePrompt: string) => {
//     setPrompt(templatePrompt);
//     setIsTemplateModalOpen(false);
//   };

//   return (
//     <div className="space-y-8">
//       <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <BookTemplate className="w-5 h-5 text-primary-light" />
//             <h3 className="text-lg font-semibold text-white">Prompt Editor</h3>
//           </div>
//           <div className="flex space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleOpenTemplateModal}
//               className="flex items-center space-x-2 px-4 py-2 bg-accent/20 hover:bg-accent/30
//                        rounded-lg transition-all"
//             >
//               <BookTemplate className="w-4 h-4 text-accent-light" />
//               <span className="text-white">
//                 {loading ? "Loading..." : "Templates"}
//               </span>
//             </motion.button>
//             <motion.button
//               onClick={onNext}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30
//                        rounded-lg transition-all group"
//             >
//               <span className="text-white">Next</span>
//               <ArrowRight className="w-4 h-4 text-primary-light group-hover:translate-x-0.5 transition-transform" />
//             </motion.button>
//           </div>
//         </div>

//         <div className="relative">
//           <textarea
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             className="w-full h-[300px] bg-black/20 backdrop-blur-lg rounded-xl p-4 text-white/90
//                      focus:ring-2 focus:ring-primary/50 focus:outline-none
//                      placeholder-white/30 resize-none"
//             placeholder="Enter your prompt here or select a template..."
//           />

//           <div className="absolute bottom-4 right-4 flex space-x-2">
//             <div className="px-3 py-1 bg-primary/20 rounded-full text-xs text-white/70">
//               Tokens: {prompt.length}
//             </div>
//           </div>
//         </div>
//       </div>

//       <TemplateModal
//         isOpen={isTemplateModalOpen}
//         onClose={() => setIsTemplateModalOpen(false)}
//         onSelect={handleTemplateSelect}
//         templates={templates}
//       />
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { ArrowRight, BookTemplate } from "lucide-react";
import { motion } from "framer-motion";
import { TemplateModal } from "./TemplateModal";
// import { templates } from "./templates";
import axios from "axios";
import { useParams } from "react-router-dom";
import { axiosConfig, axiosConfigTemplate } from "../Agent/utils/axiosConfig";

interface EditorProps {
  onNext: () => void;
}

export const Editor: React.FC<EditorProps> = ({ onNext }) => {
  const [prompt, setPrompt] = useState("");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [templates, setTemplates] = useState<string[]>([]); // Store templates here
  const { id } = useParams<{ id: string }>();
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      // Pass axiosConfigTemplate as the configuration object
      const response = await axios.get("/template/", axiosConfigTemplate);
      setTemplates(response.data.response); // Set templates data to state
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates(); // Fetch templates on component mount
  }, []);

  const fetchPrompt = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`/agents/${id}/`, axiosConfig);
      if (response.data && response.data.prompt) {
        setPrompt(response.data.prompt); 
        console.log(response.data.prompt)// Set the prompt if it exists
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
    }
  };

  useEffect(() => {
    fetchTemplates(); // Fetch templates on component mount
    fetchPrompt(); // Fetch prompt based on id from URL
  }, [id]);

  const handleOpenTemplateModal = () => {
    setIsTemplateModalOpen(true);
  };

  const handleTemplateSelect = (templatePrompt: string) => {
    setPrompt(templatePrompt);
    setIsTemplateModalOpen(false);

    updatePrompt(templatePrompt);
  };

  const updatePrompt = async (promptText: string) => {
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    setAbortController(controller);

    try {
      const payload = { prompt: promptText };
      const response = await axios.patch(`/agents/${id}/`, payload, {
        ...axiosConfig,
        signal,
      });

      if (response.status === 200) {
        console.log("Prompt updated successfully:", response.data);
      } else {
        console.error("Failed to update prompt. Status:", response.status);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous request was canceled");
      } else {
        console.error("Error updating prompt:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    setPrompt(newPrompt);

    if (abortController) {
      abortController.abort();
    }

    updatePrompt(newPrompt);
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    try {
      const payload = { prompt };
      const response = await axios.patch(
        `/agents/${id}/`,
        payload,
        axiosConfig,
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
    <div className="space-y-8">
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BookTemplate className="w-5 h-5 text-primary-light" />
            <h3 className="text-lg font-semibold text-white">Prompt Editor</h3>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenTemplateModal}
              className="flex items-center space-x-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 
                       rounded-lg transition-all"
            >
              <BookTemplate className="w-4 h-4 text-accent-light" />
              <span className="text-white">
                {loading ? "Loading..." : "Templates"}
              </span>
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting || !prompt}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all group ${
                isSubmitting
                  ? "bg-primary/30 cursor-not-allowed"
                  : "bg-primary/20 hover:bg-primary/30"
              }`}
            >
              <span className="text-white">
                {isSubmitting ? "Submitting..." : "Next"}
              </span>
              <ArrowRight className="w-4 h-4 text-primary-light group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={handlePromptChange}
            className="w-full h-[300px] bg-black/20 backdrop-blur-lg rounded-xl p-4 text-white/90 
                     focus:ring-2 focus:ring-primary/50 focus:outline-none
                     placeholder-white/30 resize-none"
            placeholder="Enter your prompt here or select a template..."
          />

          <div className="absolute bottom-4 right-4 flex space-x-2">
            <div className="px-3 py-1 bg-primary/20 rounded-full text-xs text-white/70">
              Tokens: {prompt.length}
            </div>
          </div>
        </div>
      </div>

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelect={handleTemplateSelect}
        templates={templates}
      />
    </div>
  );
};
