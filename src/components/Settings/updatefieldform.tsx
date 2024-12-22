import React, { useState, ReactNode } from "react";
import { ChevronDown, X } from "lucide-react";

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    provider: "GHL Channel Provider ",
    activity: "Custom field",
    customFieldValue: "",
    evaluateOn: "Evaluate here",
    silent: false,
    promptContent: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">Form Details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Provider *
            </label>
            <div className="relative">
              <select
                value={formData.provider}
                onChange={(e) =>
                  setFormData({ ...formData, provider: e.target.value })
                }
                className="w-full border rounded-md py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">GHL Channel</option>
                <option value="ghl">GHL Channel</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-2.5 text-gray-500"
                size={20}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Activity *
              </label>
              <div className="relative">
                <select
                  value={formData.activity}
                  onChange={(e) =>
                    setFormData({ ...formData, activity: e.target.value })
                  }
                  className="w-full border rounded-md py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="custom_field">Custom field</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-2.5 text-gray-500"
                  size={20}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Custom field value
              </label>
              <input
                type="text"
                placeholder="Custom field value"
                value={formData.customFieldValue}
                onChange={(e) =>
                  setFormData({ ...formData, customFieldValue: e.target.value })
                }
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500">
                Please enter values in this format {"{{"}
                &nbsp;contact.field_name{"}}"}.&nbsp;Do not leave any white
                spaces.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Evaluate on *
            </label>
            <div className="relative">
              <select
                value={formData.evaluateOn}
                onChange={(e) =>
                  setFormData({ ...formData, evaluateOn: e.target.value })
                }
                className="w-full border rounded-md py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select evaluation criteria</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-2.5 text-gray-500"
                size={20}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.silent}
                onChange={(e) =>
                  setFormData({ ...formData, silent: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-sm font-medium text-gray-700">Silent</span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Prompt Content *
            </label>
            <textarea
              placeholder="Enter prompt content"
              value={formData.promptContent}
              onChange={(e) =>
                setFormData({ ...formData, promptContent: e.target.value })
              }
              className="w-full border rounded-md py-2 px-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            IMPORT PROMPT
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
