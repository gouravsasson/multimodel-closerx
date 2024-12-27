import { ArrowRight, Building2, Target } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import useWhitelableStore from "@/hooks/useWhiteLableS";
import axios from "axios";
import { axiosConfig } from "@/pages/auth/axiosConfig";
import useLoadingStore from "@/hooks/useLoading";

function CnameUrl() {
  const { response,setResponse } = useWhitelableStore();
  const { loading, setLoading } = useLoadingStore();
  const [companyName, setCompanyName] = useState(
    response?.legal_name === null || response?.legal_name === undefined
      ? ""
      : response.legal_name
  );
  const [image, setImage] = useState(null); 
  console.log(image)
  const [preview, setPreview] = useState(response?.logo === null || response?.logo === undefined
    ? ""
    : response.logo); // State to store the preview
    console.log(preview)
  


    const handleUpdateCompanyDetail = async () => {
      try {
        const formData = new FormData(); 
        formData.append("legal_name", companyName); 
        formData.append("logo", image); 
    
        const updateWhitelable = await axios.patch(
          "update-whitelabel/",
          formData, // Pass the FormData object
          {
            ...axiosConfig, // Spread the existing axiosConfig
            headers: {
              ...axiosConfig.headers, // Spread existing headers
              "Content-Type": "multipart/form-data", // Ensure correct encoding
            },
          }
        );
    
        console.log("Update successful:", updateWhitelable.data);
      } catch (error) {
        console.error("Error updating company details:", error.response || error.message);
      }
    };
    
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; 

    // Ensure the file is an image
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImage(selectedFile); 

      // Generate a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please select a valid image file.");
      e.target.value = null; 
    }
  };

  return (
    <>
    
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
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 h-8 w-8">
            <img className=" w-full h-full" src={preview} alt="" />
            </div>
            {/* <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" /> */}
            <input
              type="file"
              // value={logourl}
              onChange={handleImageChange}
              className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
                       text-white placeholder-white/40 focus:outline-none focus:ring-2
                       focus:ring-primary/50"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpdateCompanyDetail}
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
    
    
    </>
  );
}

export default CnameUrl;
