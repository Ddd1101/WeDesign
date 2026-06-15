import type { StudioItem } from "@/types";

/* ── 水晶质感渐变 ── */
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
    `0 2px 6px rgba(${r},${g},${b},0.5)`,
    `0 0 14px rgba(${r},${g},${b},0.25)`,
    `inset 0 1px 2px rgba(255,255,255,0.35)`,
    `inset 0 -2px 4px rgba(0,0,0,0.25)`,
    `inset 2px 0 3px rgba(255,255,255,0.15)`,
    `inset -1px 0 2px rgba(0,0,0,0.15)`,
  ].join(", ");
}

interface Props {
  items: StudioItem[];
  size: number;
}

export default function BraceletPreview({ items, size }: Props) {
  const count = items.length;
  const radius = (size * 0.7) / 2;

  // 每个元素的实际尺寸（珠子用独立尺寸，配件用默认）
  const defaultBeadSize = 8;
  const itemSizes = items.map((item) => {
    if (item.kind === "bead") return item.beadSize ?? defaultBeadSize;
    return defaultBeadSize * 0.75;
  });
  const totalSize = itemSizes.reduce((s, sz) => s + sz, 0);

  // 像素半径映射函数
  const sizeToPx = (beadSize: number) => {
    if (count === 0) return 10;
    const base = Math.min((2 * Math.PI * radius) / count / 2.2, size * 0.07);
    return Math.max(6, Math.min(20, (beadSize / 8) * base));
  };

  // 累积角度
  const cumulativeAngles: number[] = [];
  let cum = 0;
  for (let i = 0; i < itemSizes.length; i++) {
    const proportion = totalSize > 0 ? itemSizes[i] / totalSize : 1 / count;
    cum += proportion * 2 * Math.PI;
    cumulativeAngles.push(cum - Math.PI / 2);
  }

  const getColorHex = (item: StudioItem): string => {
    if (item.kind === "bead") return item.bead.colorHex;
    return item.accessory.colorHex;
  };

  const getImageUrl = (item: StudioItem): string | undefined => {
    if (item.kind === "bead") return item.bead.imageDataUrl;
    return item.accessory.imageDataUrl;
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* 轨道线 */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(201,160,78,0.15)"
          strokeWidth={1}
          strokeDasharray="3 5"
        />
      </svg>

      {items.map((item, i) => {
        const angle = cumulativeAngles[i] ?? 0;
        const s = sizeToPx(itemSizes[i] ?? defaultBeadSize) * 2;
        const cx = Math.cos(angle) * radius + size / 2 - s / 2;
        const cy = Math.sin(angle) * radius + size / 2 - s / 2;
        const colorHex = getColorHex(item);
        const imageUrl = getImageUrl(item);

        return (
          <div
            key={item.id}
            className="absolute rounded-full overflow-hidden"
            style={{
              width: s,
              height: s,
              left: cx,
              top: cy,
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  background: crystalGradient(colorHex),
                  boxShadow: crystalShadow(colorHex),
                }}
              />
            )}
          </div>
        );
      })}

      {count === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width={size * 0.6}
            height={size * 0.6}
            className="pointer-events-none"
          >
            <circle
              cx={size * 0.3}
              cy={size * 0.3}
              r={size * 0.3 - 2}
              fill="none"
              stroke="rgba(232,228,221,0.1)"
              strokeWidth={1.5}
              strokeDasharray="5 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
}