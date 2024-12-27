import React, { useState } from "react";
import {
  Phone,
  Video,
  PlusCircle,
  MinusCircle,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import { ComingSoonPopup } from "./ComingSoonPopup";
import type { LucideIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ClientCardProps {
  name: string;
  id: string;
  credits: number;
  balance: number;
  minutesUsed: number;
  agents: number;
  price: number;
  status: "Active" | "Inactive";
  schema_name: string;
}

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  color: "blue" | "emerald" | "purple" | "red" | "indigo" | "amber";
  onClick?: () => void;
  isComingSoon?: boolean;
}

function ActionButton({
  icon: Icon,
  label,
  color,
  onClick,
  isComingSoon = false,
}: ActionButtonProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleClick = (e: React.MouseEvent) => {
    if (isComingSoon) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      setPopupPosition({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } else if (onClick) {
      onClick();
    }
  };

  const colors = {
    blue: "bg-blue-400/10 text-blue-400 hover:bg-blue-400/20",
    emerald: "bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20",
    purple: "bg-purple-400/10 text-purple-400 hover:bg-purple-400/20",
    red: "bg-red-400/10 text-red-400 hover:bg-red-400/20",
    indigo: "bg-indigo-400/10 text-indigo-400 hover:bg-indigo-400/20",
    amber: "bg-amber-400/10 text-amber-400 hover:bg-amber-400/20",
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${colors[color]}`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </button>
      <ComingSoonPopup
        isVisible={showPopup}
        position={popupPosition}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}

export function ClientCard({
  name,
  id,
  credits,
  balance,
  minutesUsed,
  agents,
  price,
  status,
  schema_name,
}: ClientCardProps) {
  // console.log(schema_name);
  const handleConnectGHL = (schema_name: string) => {
    if (!schema_name) {
      toast.error("Schema name is missing!");
      return;
    }

    const redirectUrl = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=https://app.closerx.ai/g-h-l/success&state=${schema_name}&client_id=676906277d17de2a8a222a9d-m52bcifq&scope=contacts.write%20contacts.readonly%20calendars.readonly%20calendars.write%20calendars/events.readonly%20calendars/events.write%20locations/customValues.readonly%20locations/customValues.write%20locations/tags.write%20locations.readonly`;

    window.location.href = redirectUrl;
  };

  return (
    <div className="bg-[#2D2B3F] rounded-xl p-6 shadow-lg border border-[#3D3B54]">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-[#3D3B54] rounded-lg flex items-center justify-center">
            <span className="text-[#B4B3C5] font-semibold">
              {name.substring(0, 10)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">{name}</h3>
            <p className="text-sm text-[#8B8A9B]">ID: {id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#8B8A9B]">Credit Price: ${price}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "Active"
                ? "bg-emerald-400/20 text-emerald-400"
                : "bg-red-400/20 text-red-400"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Credits", value: credits },
          { label: "Credit Balance", value: balance },
          { label: "Minutes Used", value: minutesUsed },
          { label: "Active Agents", value: agents },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-sm text-[#8B8A9B]">{item.label}</div>
            <div className="font-semibold text-white">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-2">
        <ActionButton
          icon={Phone}
          label="Connect GHL"
          color="blue"
          onClick={() => handleConnectGHL(schema_name)}
        />
        <ActionButton
          icon={Video}
          label="Video Records"
          color="emerald"
          // onClick={() => {}}
          isComingSoon
        />
        <ActionButton
          icon={PlusCircle}
          label="Add Credits"
          color="purple"
          isComingSoon
        />
        <ActionButton
          icon={MinusCircle}
          label="Remove Credits"
          color="red"
          isComingSoon
        />
        <ActionButton
          icon={ExternalLink}
          label="Access Account"
          color="indigo"
          isComingSoon
        />
        <ActionButton
          icon={DollarSign}
          label="Update Price"
          color="amber"
          isComingSoon
        />
      </div>
    </div>
  );
}
