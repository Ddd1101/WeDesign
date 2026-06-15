import { useStudioStore } from "@/store/studioStore";
import { AlertTriangle } from "lucide-react";

const WRIST_PRESETS = [140, 160, 180];
const BEAD_PRESETS = [6, 8, 10, 12];

export default function SizeSettings() {
  const { wristSize, beadSize, currentItems, setWristSize, setBeadSize } =
    useStudioStore();

  const hasConflict = currentItems.length * beadSize > wristSize;

  return (
    <div className="glass rounded-2xl p-4 space-y-4">
      {/* 手腕周长 */}
      <div className="space-y-2">
        <label className="text-sm text-[#e8e4dd]/50 tracking-wide">
          手腕周长 (mm)
        </label>
        <div className="flex items-center gap-2">
          {WRIST_PRESETS.map((size) => (
            <button
              key={size}
              onClick={() => setWristSize(size)}
              className={`px-3 py-1.5 rounded-xl text-sm tracking-wide transition-all duration-300 ${
                wristSize === size
                  ? "border border-[#c9a04e] bg-[#c9a04e]/15 text-[#c9a04e]"
                  : "border border-white/[0.08] text-[#e8e4dd]/50 hover:text-[#e8e4dd]"
              }`}
            >
              {size}
            </button>
          ))}
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={100}
              max={250}
              value={wristSize}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 100 && val <= 250) {
                  setWristSize(val);
                }
              }}
              className="w-16 px-2.5 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm text-[#e8e4dd] text-center tracking-wide outline-none transition-all duration-300 focus:border-[#c9a04e]/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="自定义"
            />
            <span className="text-xs text-[#e8e4dd]/30">mm</span>
          </div>
        </div>
      </div>

      {/* 珠子尺寸 */}
      <div className="space-y-2">
        <label className="text-sm text-[#e8e4dd]/50 tracking-wide">
          珠子直径 (mm)
        </label>
        <div className="flex items-center gap-2">
          {BEAD_PRESETS.map((size) => (
            <button
              key={size}
              onClick={() => setBeadSize(size)}
              className={`px-3 py-1.5 rounded-xl text-sm tracking-wide transition-all duration-300 ${
                beadSize === size
                  ? "border border-[#c9a04e] bg-[#c9a04e]/15 text-[#c9a04e]"
                  : "border border-white/[0.08] text-[#e8e4dd]/50 hover:text-[#e8e4dd]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 冲突警告 */}
      {hasConflict && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.06] animate-slide-up">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-red-400/90 leading-relaxed">
            珠子数量 × 珠子直径超出周长，请调整尺寸或减少珠子
          </p>
        </div>
      )}
    </div>
  );
}