import type { Accessory } from "@/types";

const typeIcons: Record<string, string> = {
  spacer: "○",
  pendant: "◇",
  charm: "☆",
  clasp: "◎",
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
      className={`group flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-[#d4a843]/15 border border-[#d4a843]/40 shadow-[0_0_15px_rgba(212,168,67,0.1)]"
          : "bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10"
      }`}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: accessory.imageDataUrl
            ? "transparent"
            : accessory.colorHex,
          boxShadow: accessory.imageDataUrl
            ? "none"
            : `0 0 12px ${accessory.colorHex}60, inset 0 2px 3px rgba(255,255,255,0.25), inset 0 -2px 3px rgba(0,0,0,0.2)`,
          border: "1px solid rgba(255,255,255,0.2)",
          overflow: "hidden",
        }}
      >
        {accessory.imageDataUrl ? (
          <img
            src={accessory.imageDataUrl}
            alt={accessory.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-[#f8f0e3]/80">
            {typeIcons[accessory.type] || "●"}
          </span>
        )}
      </div>
      <span className="text-[11px] text-[#f8f0e3]/70 group-hover:text-[#f8f0e3] transition-colors text-center leading-tight">
        {accessory.name}
      </span>
    </button>
  );
}
