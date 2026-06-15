import { useStudioStore } from "@/store/studioStore";
import DesignCard from "@/components/DesignCard";
import { Gem } from "lucide-react";

export default function Gallery() {
  const { savedDesigns, deleteDesign } = useStudioStore();

  return (
    <div className="min-h-screen bg-[#0d0618] pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#f8f0e3] mb-4">
            作品画廊
          </h1>
          <p className="text-[#f8f0e3]/50 max-w-lg mx-auto">
            你的每一件水晶手链设计，都是独一无二的艺术品
          </p>
        </div>

        {savedDesigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Gem className="w-10 h-10 text-[#f8f0e3]/20" />
            </div>
            <h3 className="text-[#f8f0e3]/50 text-lg mb-2">还没有作品</h3>
            <p className="text-[#f8f0e3]/30 text-sm mb-6">
              去设计工坊创作你的第一条水晶手链吧
            </p>
            <a
              href="/studio"
              className="px-6 py-3 bg-gradient-to-r from-[#d4a843] to-[#b8860b] text-[#1a0a2e] font-semibold rounded-full hover:shadow-[0_0_20px_rgba(212,168,67,0.3)] transition-all"
            >
              开始创作
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedDesigns.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
                showActions
                onDelete={deleteDesign}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
