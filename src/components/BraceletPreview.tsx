import type { StudioItem } from '@/types';

interface Props {
  items: StudioItem[];
  size: number;
}

export default function BraceletPreview({ items, size }: Props) {
  const count = items.length;
  const radius = (size * 0.7) / 2;
  const beadRadius = count > 0
    ? Math.min((2 * Math.PI * radius) / count / 2.2, size * 0.07)
    : 10;

  const getColorHex = (item: StudioItem): string => {
    if (item.kind === 'bead') return item.bead.colorHex;
    return item.accessory.colorHex;
  };

  const getImageUrl = (item: StudioItem): string | undefined => {
    if (item.kind === 'bead') return item.bead.imageDataUrl;
    return item.accessory.imageDataUrl;
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a843]/30"
        style={{ width: size * 0.7, height: size * 0.7 }}
      />

      {items.map((item, i) => {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius + size / 2 - beadRadius;
        const y = Math.sin(angle) * radius + size / 2 - beadRadius;
        const beadSize = beadRadius * 2;
        const colorHex = getColorHex(item);
        const imageUrl = getImageUrl(item);

        return (
          <div
            key={item.id}
            className="absolute rounded-full overflow-hidden"
            style={{
              width: beadSize,
              height: beadSize,
              left: x,
              top: y,
              backgroundColor: imageUrl ? 'transparent' : colorHex,
              boxShadow: imageUrl
                ? 'none'
                : `0 0 8px ${colorHex}80, inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)`,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {imageUrl && (
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
            )}
          </div>
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