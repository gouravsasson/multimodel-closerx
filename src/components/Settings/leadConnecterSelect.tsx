import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  id: string;
  label: string;
}

interface MultiSelectButtonProps {
  options?: Option[];
  onChange?: (selectedIds: string[]) => void;
  placeholder?: string;
}

const LeadConnectorSelect = ({
  options = [],
  onChange,
  placeholder = "Select options...",
}: MultiSelectButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (id: string) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelectedIds);
    onChange?.(newSelectedIds);
  };

  const getSelectedLabels = () => {
    if (selectedIds.length === 0) return placeholder;
    const selected = options
      .filter((option) => selectedIds.includes(option.id))
      .map((option) => option.label);
    return selected.join(", ");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-transparent text-white border rounded-lg shadow-sm 
                 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 
                 focus:ring-opacity-50 flex items-center justify-between"
      >
        <span className="truncate">{getSelectedLabels()}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-transparent  rounded-lg shadow-lg">
          <div className="max-h-60 overflow-auto py-1">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className="w-full px-4 py-2 text-left text-white 
                  hover:ring hover:ring-purple-80  flex items-center justify-between"
              >
                <span>{option.label}</span>
                {selectedIds.includes(option.id) && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadConnectorSelect;
