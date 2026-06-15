import { useStudioStore } from "@/store/studioStore";
import DesignCard from "@/components/DesignCard";
import { Gem, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Gallery() {
  const { savedDesigns, deleteDesign } = useStudioStore();

  return (
    <div className="min-h-screen bg-[#0a0a0f] bg-grid pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl md:text-5xl text-[#e8e4dd] mb-4 tracking-wide">
            作品画廊
          </h1>
          <div className="gold-rule w-16 mx-auto mb-4" />
          <p className="text-[#e8e4dd]/35 max-w-lg mx-auto leading-relaxed">
            你的每一件水晶手链设计，都是独一无二的艺术品
          </p>
        </div>

        {savedDesigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mb-6">
              <Gem className="w-10 h-10 text-[#e8e4dd]/15" />
            </div>
            <h3 className="text-[#e8e4dd]/40 text-lg mb-2 font-medium">
              还没有作品
            </h3>
            <p className="text-[#e8e4dd]/20 text-sm mb-8">
              去设计工坊创作你的第一条水晶手链吧
            </p>
            <Link
              to="/studio"
              className="flex items-center gap-2 px-6 py-3 bg-[#c9a04e] text-[#0a0a0f] font-semibold rounded-xl hover:bg-[#d4a853] hover:shadow-[0_0_20px_rgba(201,160,78,0.25)] transition-all text-sm tracking-wide"
            >
              <Gem className="w-4 h-4" />
              开始创作
              <ArrowRight className="w-4 h-4" />
            </Link>
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
