import { useState } from "react";
import { X, Gem } from "lucide-react";
import type { CrystalBead, Accessory } from "@/types";
import { useStudioStore } from "@/store/studioStore";
import ImageUpload from "./ImageUpload";

const BEAD_SIZE_OPTIONS = [6, 8, 10, 12, 14];

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

const shapeLabels: Record<string, string> = {
  round: "圆形",
  oval: "椭圆形",
  square: "方形",
  heart: "心形",
};

const typeLabels: Record<string, string> = {
  spacer: "隔珠",
  pendant: "吊坠",
  charm: "挂饰",
  clasp: "扣头",
};

interface BeadProps {
  bead: CrystalBead;
  onClose: () => void;
  onAdd: (bead: CrystalBead, beadSize?: number) => void;
  accessory?: never;
}

interface AccessoryProps {
  bead?: never;
  accessory: Accessory;
  onClose: () => void;
  onAdd: () => void;
}

type Props = BeadProps | AccessoryProps;

export default function BeadDetail(props: Props) {
  const { onClose } = props;
  const [selectedSize, setSelectedSize] = useState<number>(
    props.bead?.size || 8,
  );
  const updateBeadImage = useStudioStore((s) => s.updateBeadImage);
  const updateAccessoryImage = useStudioStore((s) => s.updateAccessoryImage);

  const handleImageUpload = (dataUrl: string) => {
    if (props.bead) {
      updateBeadImage(props.bead.id, dataUrl);
    } else if (props.accessory) {
      updateAccessoryImage(props.accessory.id, dataUrl);
    }
  };

  const imageUrl = props.bead?.imageDataUrl || props.accessory?.imageDataUrl;
  const colorHex = props.bead?.colorHex || props.accessory?.colorHex || "#888";
  const name = props.bead?.name || props.accessory?.name || "";
  const category = props.bead
    ? `${props.bead.category} · ${shapeLabels[props.bead.shape]} · ${props.bead.size}mm`
    : `${props.accessory?.category} · ${typeLabels[props.accessory?.type || "charm"]}`;
  const meaning = props.bead?.meaning || props.accessory?.meaning || "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#12121a] border border-white/[0.06] rounded-2xl p-6 w-[360px] max-w-[90vw] shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
              style={{
                background: imageUrl ? "transparent" : crystalGradient(colorHex),
                boxShadow: imageUrl
                  ? "none"
                  : `0 2px 12px ${colorHex}40, inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)`,
                border: "2px solid rgba(255,255,255,0.12)",
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div>
              <h3 className="text-[#e8e4dd] font-semibold text-lg tracking-wide">
                {name}
              </h3>
              <p className="text-[#e8e4dd]/40 text-sm">{category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#e8e4dd]/30 hover:text-[#e8e4dd]/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 寓意 */}
        <div className="bg-[#c9a04e]/[0.04] rounded-xl p-4 mb-5 border border-[#c9a04e]/10">
          <div className="flex items-center gap-2 mb-2">
            <Gem className="w-4 h-4 text-[#c9a04e]" />
            <span className="text-xs text-[#c9a04e] font-medium tracking-wide">
              寓意
            </span>
          </div>
          <p className="text-[#e8e4dd]/60 text-sm leading-relaxed">{meaning}</p>
        </div>

        {/* 珠子尺寸选择 — 仅对珠子显示 */}
        {props.bead && (
          <div className="mb-5 space-y-2">
            <p className="text-xs text-[#e8e4dd]/25 tracking-wide">
              珠子直径 (mm)
            </p>
            <div className="flex items-center gap-2">
              {BEAD_SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 rounded-xl text-sm tracking-wide transition-all duration-300 ${
                    selectedSize === size
                      ? "border border-[#c9a04e] bg-[#c9a04e]/15 text-[#c9a04e]"
                      : "border border-white/[0.08] text-[#e8e4dd]/50 hover:text-[#e8e4dd]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 图片上传 */}
        <div className="mb-5">
          <p className="text-xs text-[#e8e4dd]/25 mb-2.5 tracking-wide">
            自定义图片
          </p>
          <ImageUpload onUpload={handleImageUpload} currentImage={imageUrl} />
        </div>

        {/* 添加按钮 */}
        <button
          onClick={() => {
            if (props.bead) {
              props.onAdd(props.bead, selectedSize);
            } else {
              (props.onAdd as () => void)();
            }
          }}
          className="w-full py-3 bg-[#c9a04e] text-[#0a0a0f] font-semibold rounded-xl hover:bg-[#d4a853] hover:shadow-[0_0_20px_rgba(201,160,78,0.25)] transition-all text-sm tracking-wide"
        >
          添加到手链
        </button>
      </div>
    </div>
  );
}