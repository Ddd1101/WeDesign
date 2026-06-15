import type { Accessory } from "@/types";

const typeIcons: Record<string, string> = {
  spacer: "○",
  pendant: "◇",
  charm: "☆",
  clasp: "◎",
};

const typeColors: Record<string, string> = {
  spacer: "#c9a04e",
  pendant: "#e0c878",
  charm: "#d4a843",
  clasp: "#b8860b",
};

interface Props {
  accessory: Accessory;
  onClick: (acc: Accessory) => void;
  isActive?: boolean;
}

export default function AccessoryItem({
  accessory,
  onClick,
  isActive = false,
}: Props) {
  return (
    <button
      onClick={() => onClick(accessory)}
      className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-[#c9a04e]/10 border border-[#c9a04e]/30 glow-gold"
          : "bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08]"
      }`}
    >
      <div
        className="relative w-11 h-11 rounded-full flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 overflow-hidden"
        style={{
          background: accessory.imageDataUrl
            ? "transparent"
            : `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.15), transparent 60%), ${typeColors[accessory.type] || "#888"}`,
          boxShadow: accessory.imageDataUrl
            ? "none"
            : `0 2px 8px ${typeColors[accessory.type] || "#888"}40, inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 3px rgba(0,0,0,0.25)`,
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {accessory.imageDataUrl ? (
          <img
            src={accessory.imageDataUrl}
            alt={accessory.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-[#e8e4dd]/80">
            {typeIcons[accessory.type] || "●"}
          </span>
        )}
        {isActive && (
          <div className="absolute inset-0 rounded-full border-2 border-[#c9a04e] shadow-[0_0_10px_rgba(201,160,78,0.4)]" />
        )}
      </div>
      <span className="text-[11px] text-[#e8e4dd]/60 group-hover:text-[#e8e4dd]/90 transition-colors text-center leading-tight">
        {accessory.name}
      </span>
    </button>
  );
}