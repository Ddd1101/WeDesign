import { X, Gem } from 'lucide-react';
import type { CrystalBead } from '@/types';

const shapeLabels: Record<string, string> = {
  round: '圆形',
  oval: '椭圆形',
  square: '方形',
  heart: '心形',
};

interface Props {
  bead: CrystalBead;
  onClose: () => void;
  onAdd: (bead: CrystalBead) => void;
}

export default function BeadDetail({ bead, onClose, onAdd }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#1e0e38] border border-[#d4a843]/20 rounded-2xl p-6 w-[340px] max-w-[90vw] shadow-2xl animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full"
              style={{
                backgroundColor: bead.colorHex,
                boxShadow: `0 0 20px ${bead.colorHex}60, inset 0 3px 4px rgba(255,255,255,0.3), inset 0 -3px 4px rgba(0,0,0,0.2)`,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            />
            <div>
              <h3 className="text-[#f8f0e3] font-semibold text-lg">{bead.name}</h3>
              <p className="text-[#f8f0e3]/50 text-sm">
                {bead.category} · {shapeLabels[bead.shape]} · {bead.size}mm
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#f8f0e3]/40 hover:text-[#f8f0e3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#d4a843]/5 rounded-xl p-4 mb-5 border border-[#d4a843]/10">
          <div className="flex items-center gap-2 mb-2">
            <Gem className="w-4 h-4 text-[#d4a843]" />
            <span className="text-xs text-[#d4a843] font-medium">寓意</span>
          </div>
          <p className="text-[#f8f0e3]/70 text-sm leading-relaxed">{bead.meaning}</p>
        </div>

        <button
          onClick={() => onAdd(bead)}
          className="w-full py-3 bg-gradient-to-r from-[#d4a843] to-[#b8860b] text-[#1a0a2e] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(212,168,67,0.3)] transition-all duration-300"
        >
          添加到手链
        </button>
      </div>
    </div>
  );
}