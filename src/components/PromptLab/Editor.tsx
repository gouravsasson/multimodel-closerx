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

import React, { useState } from "react";
import { ArrowRight, BookTemplate } from "lucide-react";
import { motion } from "framer-motion";
import { TemplateModal } from "./TemplateModal";
// import type { Template } from "./templates";
import { templates } from "./templates";
import axios from "axios";
import { useParams } from "react-router-dom";

interface EditorProps {
  onNext: () => void;
}

export const Editor: React.FC<EditorProps> = ({ onNext }) => {
  const [prompt, setPrompt] = useState("");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams<{ id: string }>();
  console.log(id);
  const handleOpenTemplateModal = () => {
    setIsTemplateModalOpen(true);
  };

  const handleTemplateSelect = (templatePrompt: string) => {
    setPrompt(templatePrompt);
    setIsTemplateModalOpen(false);
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    try {
      const payload = { prompt };
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
        config,
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
            onChange={(e) => setPrompt(e.target.value)}
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
