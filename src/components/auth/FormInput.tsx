import React from "react";
import { LucideIcon } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  icon: Icon,
  ...props
}) => {
  return (
    <div>
      <label className="text-white/90 text-sm block mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/70" />
        <input
          {...props}
          className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
                   text-white placeholder-white/40 focus:outline-none focus:ring-2
                   focus:ring-white/25 transition-all"
        />
      </div>
    </div>
  );
};
