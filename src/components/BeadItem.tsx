import type { CrystalBead } from '@/types';

interface Props {
  bead: CrystalBead;
  onClick: (bead: CrystalBead) => void;
  isActive?: boolean;
}

export default function BeadItem({ bead, onClick, isActive = false }: Props) {
  return (
    <button
      onClick={() => onClick(bead)}
      className={`group flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-[#d4a843]/15 border border-[#d4a843]/40 shadow-[0_0_15px_rgba(212,168,67,0.1)]'
          : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10'
      }`}
    >
      {/* 珠子圆形预览 */}
      <div
        className="w-10 h-10 rounded-full transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: bead.colorHex,
          boxShadow: `0 0 12px ${bead.colorHex}60, inset 0 2px 3px rgba(255,255,255,0.25), inset 0 -2px 3px rgba(0,0,0,0.2)`,
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      />
      <span className="text-[11px] text-[#f8f0e3]/70 group-hover:text-[#f8f0e3] transition-colors text-center leading-tight">
        {bead.name}
      </span>
    </button>
  );
}