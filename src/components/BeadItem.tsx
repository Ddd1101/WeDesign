import type { CrystalBead } from "@/types";

/* ── 水晶质感渐变（与 BraceletCanvas 保持一致） ── */
function crystalGradient(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const hi = `${Math.min(255, r + 80)},${Math.min(255, g + 80)},${Math.min(255, b + 80)}`;
  const lo = `${Math.max(0, r - 40)},${Math.max(0, g - 40)},${Math.max(0, b - 40)}`;
  const glow = `${Math.min(255, r + 140)},${Math.min(255, g + 140)},${Math.min(255, b + 140)}`;
  return `
    radial-gradient(circle at 35% 30%, rgba(${glow},0.9) 0%, rgba(${hi},0.4) 8%, transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(${r},${g},${b},0.85) 30%, rgba(${r},${g},${b},0.6) 55%, rgba(${lo},0.9) 85%),
    radial-gradient(ellipse at 60% 65%, rgba(${glow},0.3) 0%, transparent 45%),
    radial-gradient(ellipse at 25% 70%, rgba(${lo},0.5) 0%, transparent 50%)
  `;
}

function crystalShadow(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [
    `0 2px 8px rgba(${r},${g},${b},0.4)`,
    `0 0 16px rgba(${r},${g},${b},0.2)`,
    `inset 0 1px 2px rgba(255,255,255,0.3)`,
    `inset 0 -2px 4px rgba(0,0,0,0.2)`,
    `inset 2px 0 3px rgba(255,255,255,0.12)`,
    `inset -1px 0 2px rgba(0,0,0,0.12)`,
  ].join(", ");
}

const shapeRadius: Record<string, string> = {
  round: "50%",
  oval: "45%",
  square: "18%",
  heart: "40% 40% 10% 40%",
};

interface Props {
  bead: CrystalBead;
  onClick: (bead: CrystalBead) => void;
  isActive?: boolean;
}

export default function BeadItem({ bead, onClick, isActive = false }: Props) {
  return (
    <button
      onClick={() => onClick(bead)}
      className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-[#c9a04e]/10 border border-[#c9a04e]/30 glow-gold"
          : "bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08]"
      }`}
    >
      {/* 珠子预览 */}
      <div
        className="relative w-11 h-11 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
        style={{
          borderRadius: shapeRadius[bead.shape] || "50%",
        }}
      >
        {bead.imageDataUrl ? (
          <img
            src={bead.imageDataUrl}
            alt={bead.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: crystalGradient(bead.colorHex),
              boxShadow: crystalShadow(bead.colorHex),
            }}
          />
        )}
        {/* 选中指示环 */}
        {isActive && (
          <div className="absolute inset-0 rounded-full border-2 border-[#c9a04e] shadow-[0_0_10px_rgba(201,160,78,0.4)]" />
        )}
      </div>

      {/* 名称 */}
      <span className="text-[11px] text-[#e8e4dd]/60 group-hover:text-[#e8e4dd]/90 transition-colors text-center leading-tight">
        {bead.name}
      </span>
    </button>
  );
}