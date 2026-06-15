import { useStudioStore } from "@/store/studioStore";
import type { DesignBead } from "@/types";

export default function BraceletCanvas() {
  const { currentBeads, removeBead } = useStudioStore();

  const size = 360;
  const count = currentBeads.length;
  const radius = (size * 0.7) / 2;
  const beadRadius =
    count > 0
      ? Math.min((2 * Math.PI * radius) / count / 2.2, size * 0.06)
      : 14;

  return (
    <div className="flex-1 flex items-center justify-center relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative" style={{ width: size, height: size }}>
        {/* 手链线 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a843]/30"
          style={{ width: size * 0.7, height: size * 0.7 }}
        />

        {currentBeads.map((db: DesignBead, i: number) => {
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius + size / 2 - beadRadius;
          const y = Math.sin(angle) * radius + size / 2 - beadRadius;
          const beadSize = beadRadius * 2;

          return (
            <div
              key={db.id}
              onClick={() => removeBead(i)}
              className="absolute rounded-full cursor-pointer group transition-transform hover:scale-125 z-10"
              style={{
                width: beadSize,
                height: beadSize,
                left: x,
                top: y,
                backgroundColor: db.bead.colorHex,
                boxShadow: `0 0 12px ${db.bead.colorHex}80, inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.3)`,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              title={`${db.bead.name} - 点击移除`}
            />
          );
        })}

        {/* 空状态提示 */}
        {count === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div
              className="rounded-full border-2 border-dashed border-[#f8f0e3]/15 mb-4"
              style={{ width: size * 0.6, height: size * 0.6 }}
            />
            <p className="text-[#f8f0e3]/30 text-sm">选择左侧珠子开始设计</p>
            <p className="text-[#f8f0e3]/15 text-xs mt-1">点击珠子可移除</p>
          </div>
        )}
      </div>
    </div>
  );
}
