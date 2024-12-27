// import { ArrowRight, Building2, CloudUpload, File, FileUp, Target } from "lucide-react";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import useWhitelableStore from "@/hooks/useWhiteLableS";
// import axios from "axios";
// import { axiosConfig } from "@/pages/auth/axiosConfig";
// import useLoadingStore from "@/hooks/useLoading";

// function CnameUrl() {
//   const { response, setResponse } = useWhitelableStore();
//   const { loading, setLoading } = useLoadingStore();
//   const [companyName, setCompanyName] = useState(
//     response?.legal_name === null || response?.legal_name === undefined
//       ? ""
//       : response.legal_name
//   );
//   const [image, setImage] = useState(null);
//   console.log(image);
//   const [preview, setPreview] = useState(
//     response?.logo === null || response?.logo === undefined ? "" : response.logo
//   ); // State to store the preview
//   console.log(preview);

//   const handleUpdateCompanyDetail = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("legal_name", companyName);
//       formData.append("logo", image);
//       // formData.append("favicon", faviconFile);

//       const updateWhitelable = await axios.patch(
//         "update-whitelabel/",
//         formData, // Pass the FormData object
//         {
//           ...axiosConfig, // Spread the existing axiosConfig
//           headers: {
//             ...axiosConfig.headers, // Spread existing headers
//             "Content-Type": "multipart/form-data", // Ensure correct encoding
//           },
//         }
//       );

//       console.log("Update successful:", updateWhitelable.data);
//     } catch (error) {
//       console.error(
//         "Error updating company details:",
//         error.response || error.message
//       );
//     }
//   };

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];

//     // Ensure the file is an image
//     if (selectedFile && selectedFile.type.startsWith("image/")) {
//       setImage(selectedFile);

//       // Generate a preview URL
//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(selectedFile);
//     } else {
//       alert("Please select a valid image file.");
//       e.target.value = null;
//     }
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
//       >
//         <div className="space-y-8">
//           <div>
//             <label className="text-white/90 text-sm block mb-2">
//               Company Name
//             </label>
//             <div className="relative">
//               <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
//               <input
//                 type="text"
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//                 placeholder="Enter agent name"
//                 className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
//                        text-white placeholder-white/40 focus:outline-none focus:ring-2
//                        focus:ring-primary/50"
//               />
//             </div>
//           </div>
//           <div>
//             <label className="text-white/90 text-sm block mb-2">
//               Upload Your Company Logo & Favicon
//             </label>
//             <div className="relative">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 h-8 w-8">
//                 {/* <img className=" w-full h-full" src={preview} alt="" /> */}
//               </div>
//               {/* <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" /> */}
//               <div className="flex grid grid-cols-2 space-x-2">
//                 <label>
//                   <div
//                     className="w-full bg-black/20 border flex space-x-2 h-12 border-white/10 rounded-xl pl-12 pr-4 py-3
//                        text-white placeholder-white/40 focus:outline-none focus:ring-2
//                        focus:ring-primary/50 cursor-pointer"
//                   >
//                     {" "}
//                    <CloudUpload/> <span> Upload Your Logo</span>
//                     <input
//                       type="file"
//                       // value={logourl}
//                       onChange={handleImageChange}
//                       className="hidden w-full h-full"
//                     />
//                   </div>
//                 </label>
//                 <label>
//                   <div
//                     className="w-full bg-black/20 flex cursor-pointer space-x-2 border h-12 border-white/10 rounded-xl pl-12 pr-4 py-3
//                        text-white placeholder-white/40 focus:outline-none focus:ring-2
//                        focus:ring-primary/50"
//                   >
//                     {" "}
//                     <FileUp />
//                     <span> Upload Your Favicon</span>
//                     <input
//                       type="file"
//                       // value={logourl}
//                       onChange={handleImageChange}
//                       className="hidden w-full h-full"
//                     />
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleUpdateCompanyDetail}
//             // disabled={!agentName || !selectedType}
//             className="flex-1 px-6 py-4 bg-gradient-to-r from-primary/70 to-accent/80 rounded-xl
//                      text-white font-medium flex items-center justify-center space-x-2
//                      hover:from-primary hover:to-accent transition-all duration-300
//                      shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <span>Add Company Details</span>
//             <ArrowRight className="w-5 h-5" />
//           </motion.button>
//         </div>
//       </motion.div>
//     </>
//   );
// }

// export default CnameUrl;

import { ArrowRight, Building2, CloudUpload, FileUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import useWhitelableStore from "@/hooks/useWhiteLableS";
import axios from "axios";
import { axiosConfig } from "@/pages/auth/axiosConfig";
import useLoadingStore from "@/hooks/useLoading";

function CnameUrl() {
  const { response, setResponse } = useWhitelableStore();
  const { loading, setLoading } = useLoadingStore();

  const [companyName, setCompanyName] = useState(response?.legal_name || "");
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(response?.logo || "");
  const [faviconPreview, setFaviconPreview] = useState(response?.favicon || "");
  const [logoFilename, setLogoFilename] = useState("Upload Your Logo");
  const [faviconFilename, setFaviconFilename] = useState("Upload Your Favicon");

  const handleUpdateCompanyDetail = async () => {
    try {
      const formData = new FormData();
      formData.append("legal_name", companyName);
      formData.append("logo", logoFile);
      formData.append("favicon", faviconFile);

      const updateWhitelable = await axios.patch(
        "update-whitelabel/",
        formData,
        {
          ...axiosConfig,
          headers: {
            ...axiosConfig.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (updateWhitelable.status === 200) {
        // Update Zustand store with new data
        setResponse({
          legal_name: companyName,
          logo: logoPreview,
          favicon: faviconPreview,
        });
      }

      console.log("Update successful:", updateWhitelable.data);
    } catch (error) {
      console.error(
        "Error updating company details:",
        error.response || error.message
      );
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      setLogoFilename(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
      e.target.value = null;
    }
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFaviconFile(file);
      setFaviconFilename(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFaviconPreview(reader.result); // Safely set the string value
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
      e.target.value = null;
    }
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
              placeholder="Enter company name"
              className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
                         text-white placeholder-white/40 focus:outline-none focus:ring-2
                         focus:ring-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="text-white/90 text-sm block mb-2">
            Upload Your Company Logo & Favicon
          </label>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 h-8 w-8">
            {/* <img className=" w-full h-full rounded-xl" src={preview} alt="" /> */}
          </div>
          {/* <div className="grid grid-cols-2 gap-4">
            <label>
              <div
                className="w-full bg-black/20 border flex items-center space-x-2 h-12 border-white/10 rounded-xl pl-4 pr-4 py-3
                           text-white placeholder-white/40 focus:outline-none focus:ring-2
                           focus:ring-primary/50 cursor-pointer"
              >
                <CloudUpload />
                <span>{logoFilename}</span>
                <input
                  type="file"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </div>
            </label>

            <label>
              <div
                className="w-full bg-black/20 border flex items-center space-x-2 h-12 border-white/10 rounded-xl pl-4 pr-4 py-3
                           text-white placeholder-white/40 focus:outline-none focus:ring-2
                           focus:ring-primary/50 cursor-pointer"
              >
                <FileUp />
                <span>{faviconFilename}</span>
                <input
                  type="file"
                  onChange={handleFaviconChange}
                  className="hidden"
                />
              </div>
            </label>
          </div> */}
          <div className="grid grid-cols-2 gap-4">
            {/* Logo Upload */}
            <label>
              <div
                className="w-full bg-black/20 border flex items-center space-x-4 h-12 border-white/10 rounded-xl pl-4 pr-4 py-3
                 text-white placeholder-white/40 focus:outline-none focus:ring-2
                 focus:ring-primary/50 cursor-pointer"
              >
                {/* Logo Preview */}
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <CloudUpload className="text-white/40 w-8 h-8" />
                )}

                {/* Logo Filename */}
                <span>{logoFilename}</span>
                <input
                  type="file"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </div>
            </label>

            {/* Favicon Upload */}
            <label>
              <div
                className="w-full bg-black/20 border flex items-center space-x-4 h-12 border-white/10 rounded-xl pl-4 pr-4 py-3
                 text-white placeholder-white/40 focus:outline-none focus:ring-2
                 focus:ring-primary/50 cursor-pointer"
              >
                {/* Favicon Preview */}
                {faviconPreview ? (
                  <img
                    src={faviconPreview}
                    alt="Favicon Preview"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FileUp className="text-white/40 w-8 h-8" />
                )}

                {/* Favicon Filename */}
                <span>{faviconFilename}</span>
                <input
                  type="file"
                  onChange={handleFaviconChange}
                  className="hidden"
                />
              </div>
            </label>
          </div>
        </div>
        <div className="flex items-end justify-items-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpdateCompanyDetail}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-primary/70 to-accent/80 rounded-xl
                       text-white font-medium flex items-center justify-center space-x-2
                       hover:from-primary hover:to-accent transition-all duration-300
                       shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Add Company Details</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default CnameUrl;
