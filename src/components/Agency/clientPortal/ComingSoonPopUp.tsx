import { Rocket } from "lucide-react";

interface ComingSoonPopupProps {
  isVisible: boolean;
  position: { top: number; left: number };
  onClose: () => void;
}

export function ComingSoonPopup({
  isVisible,
  position,
  onClose,
}: ComingSoonPopupProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed animate-fade-in"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translate(-50%, -120%)",
      }}
    >
      <div className="bg-[#2D2B3F] text-white px-4 py-2 rounded-lg shadow-lg border border-[#3D3B54] flex items-center gap-2">
        <Rocket className="w-4 h-4 text-purple-400" />
        <span>Coming soon!</span>
      </div>
    </div>
  );
}
