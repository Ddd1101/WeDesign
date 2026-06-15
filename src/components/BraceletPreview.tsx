import type { DesignBead } from '@/types';

interface Props {
  beads: DesignBead[];
  size: number;
}

export default function BraceletPreview({ beads, size }: Props) {
  const count = beads.length;
  const radius = (size * 0.7) / 2;
  const beadRadius = Math.min((2 * Math.PI * radius) / count / 2.2, size * 0.07);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* 手链线 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a843]/30"
        style={{ width: size * 0.7, height: size * 0.7 }}
      />

      {beads.map((db, i) => {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius + size / 2 - beadRadius;
        const y = Math.sin(angle) * radius + size / 2 - beadRadius;
        const beadSize = beadRadius * 2;

        return (
          <div
            key={db.id}
            className="absolute rounded-full"
            style={{
              width: beadSize,
              height: beadSize,
              left: x,
              top: y,
              backgroundColor: db.bead.colorHex,
              boxShadow: `0 0 8px ${db.bead.colorHex}80, inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)`,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          />
        );
      })}

      {count === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full border-2 border-dashed border-[#f8f0e3]/20"
            style={{ width: size * 0.6, height: size * 0.6 }}
          />
        </div>
      )}
    </div>
  );
}