import React, { useState } from "react";
import { X, Building2, Mail, User, Phone as PhoneIcon } from "lucide-react";
import { toast } from "react-hot-toast";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    companyName: string;
    email: string;
    name: string;
    phone: string;
  }) => void;
}

export function AddClientModal({
  isOpen,
  onClose,
  onSubmit,
}: AddClientModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Basic validation
      if (!formData.email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (formData.phone.length < 10) {
        toast.error("Please enter a valid phone number");
        return;
      }

      onSubmit(formData);
      setFormData({
        companyName: "",
        email: "",
        name: "",
        phone: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
                value={formData.companyName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyName: e.target.value,
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
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6B7B]" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2D2B3F] border border-[#3D3B54] text-white placeholder-[#6C6B7B] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter full name"
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
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
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
