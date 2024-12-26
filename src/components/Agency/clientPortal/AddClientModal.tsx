// import React, { useState } from "react";
// import { X, Building2, Mail, User, Phone as PhoneIcon } from "lucide-react";
// import { toast } from "react-hot-toast";
// import axios from "axios";

// interface AddClientModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (formData: {
//     company_name: string;
//     email: string;
//     name: string;
//     phone: string;
//   }) => void;
// }

// export function AddClientModal({
//   isOpen,
//   onClose,
//   onSubmit,
// }: AddClientModalProps) {
//   const [formData, setFormData] = useState({
//     company_name: "",
//     email: "",
//     name: "",
//     phone: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Basic validation
//       if (!formData.email.includes("@")) {
//         toast.error("Please enter a valid email address");
//         return;
//       }

//       if (formData.phone.length < 10) {
//         toast.error("Please enter a valid phone number");
//         return;
//       }
//       const response = await axios.post("/create/agency/", formData);

//       if (response.status === 201 || response.status === 200) {
//         toast.success("Client created successfully!");
//         onSubmit(formData);
//         setFormData({
//           company_name: "",
//           email: "",
//           name: "",
//           phone: "",
//         });
//         onClose();
//       } else {
//         toast.error("Failed to create client. Please try again.");
//       }
//     } catch (error: any) {
//       console.error("Error creating client:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again."
//       );
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-[#1E1B3D]/90 backdrop-blur-sm rounded-xl w-full max-w-md border border-[#3D3B54] overflow-hidden shadow-xl transform transition-all">
//         <div className="bg-gradient-to-r from-purple-600/20 to-pink-500/20 px-6 py-4 flex justify-between items-center border-b border-[#3D3B54]">
//           <h2 className="text-xl font-semibold text-white">Add New Client</h2>
//           <button
//             onClick={onClose}
//             className="text-[#8B8A9B] hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-[#B4B3C5]">
//               Company Name
//             </label>
//             <div className="relative">
//               <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
//               <input
//                 type="text"
//                 required
//                 value={formData.companyName}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     company_name: e.target.value,
//                   }))
//                 }
//                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                 placeholder="Enter company name"
//               />
//             </div>
//           </div>

//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-[#B4B3C5]">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
//               <input
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, email: e.target.value }))
//                 }
//                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                 placeholder="Enter email address"
//               />
//             </div>
//           </div>

//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-[#B4B3C5]">
//               Full Name
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, name: e.target.value }))
//                 }
//                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                 placeholder="Enter full name"
//               />
//             </div>
//           </div>

//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-[#B4B3C5]">
//               Phone Number
//             </label>
//             <div className="relative">
//               <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
//               <input
//                 type="tel"
//                 required
//                 value={formData.phone}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, phone: e.target.value }))
//                 }
//                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                 placeholder="Enter phone number"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-3 rounded-lg border border-[#3D3B54] text-[#B4B3C5] hover:bg-[#2D2B3F] transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
//             >
//               Create Account
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { X, Building2, Mail, User, Phone as PhoneIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { axiosConfig, BASE_URL } from "@/pages/auth/axiosConfig";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    company_name: string;
    email: string;
    first_name: string;
    last_name: string;
    contact_number: string;
  }) => void;
}

export function AddClientModal({
  isOpen,
  onClose,
  onSubmit,
}: AddClientModalProps) {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    first_name: "",
    last_name: "",
    contact_number: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Basic validation
      if (!formData.email || !formData.email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (!formData.contact_number || formData.contact_number.length < 5) {
        toast.error("Please enter a valid phone number");
        return;
      }

      // Send POST request
      const response = await axios.post(
        `/agency/create/agency`,
        formData,
        axiosConfig
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Client created successfully!");
        onSubmit(formData); // Notify parent component
        setFormData({
          company_name: "",
          email: "",
          first_name: "",
          last_name: "",
          contact_number: "",
        });
        onClose();
      } else {
        toast.error("Failed to create client. Please try again.");
      }
    } catch (error: any) {
      console.error("Error creating client:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1E1B3D]/90 backdrop-blur-sm rounded-xl w-full max-w-md border border-[#3D3B54] overflow-hidden shadow-xl transform transition-all">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-500/20 px-6 py-4 flex justify-between items-center border-b border-[#3D3B54]">
          <h2 className="text-xl font-semibold text-white">Add New Client</h2>
          <button
            onClick={onClose}
            className="text-[#8B8A9B] hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#B4B3C5]">
              Company Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
              <input
                type="text"
                required
                value={formData.company_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    company_name: e.target.value,
                  }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#B4B3C5]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#B4B3C5]">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter first name"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#B4B3C5]">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#B4B3C5]">
              Phone Number
            </label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
              <input
                type="tel"
                required
                value={formData.contact_number}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contact_number: e.target.value,
                  }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-[#3D3B54] text-[#B4B3C5] hover:bg-[#2D2B3F] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
