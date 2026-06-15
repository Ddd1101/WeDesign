import { Link } from "react-router-dom";
import { Gem, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] bg-grid">
      {/* 英雄区域 */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-32 overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c9a04e]/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/[0.04] rounded-full blur-[100px]" />
        </div>

        {/* 装饰线 */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-[#c9a04e]/30 to-transparent" />

        <div className="relative z-10 text-center max-w-3xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[#c9a04e]/20 bg-[#c9a04e]/[0.04]">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a04e]" />
            <span className="text-xs text-[#c9a04e]/80 tracking-[0.2em] uppercase">
              Crystal Design Studio
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-[#e8e4dd] mb-6 leading-tight tracking-wide">
            设计你独一无二的
            <br />
            <span className="text-[#c9a04e]">水晶手链</span>
          </h1>

          <p className="text-[#e8e4dd]/40 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            精选天然水晶，自由搭配珠子与配件，拖拽调整位置，打造属于你的能量手链
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/studio"
              className="group flex items-center gap-2 px-8 py-3.5 bg-[#c9a04e] text-[#0a0a0f] font-semibold rounded-xl hover:bg-[#d4a853] hover:shadow-[0_0_30px_rgba(201,160,78,0.25)] transition-all text-base tracking-wide"
            >
              <Gem className="w-5 h-5" />
              开始设计
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/gallery"
              className="px-8 py-3.5 border border-white/[0.08] text-[#e8e4dd]/50 rounded-xl hover:text-[#e8e4dd]/80 hover:bg-white/[0.04] transition-all text-base tracking-wide"
            >
              浏览作品
            </Link>
          </div>
        </div>

        {/* 底部滚动提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a04e]/40 to-transparent" />
          <span className="text-[10px] text-[#e8e4dd]/20 tracking-[0.2em] uppercase">
            Scroll
          </span>
        </div>
      </section>

      {/* 特色区域 */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-4xl text-[#e8e4dd] mb-4 tracking-wide">
              设计流程
            </h2>
            <div className="gold-rule w-24 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "选择材质",
                desc: "从紫水晶、粉晶、黑曜石等天然水晶中挑选你钟爱的材质",
              },
              {
                step: "02",
                title: "自由搭配",
                desc: "珠子与配件随心组合，拖拽调整位置，创造独特排列",
              },
              {
                step: "03",
                title: "保存分享",
                desc: "保存你的设计作品，随时回顾或与朋友分享创意",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#c9a04e]/15 transition-all duration-500"
              >
                <span className="font-display text-5xl text-[#c9a04e]/10 group-hover:text-[#c9a04e]/20 transition-colors duration-500">
                  {item.step}
                </span>
                <h3 className="text-[#e8e4dd] text-lg font-semibold mt-4 mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[#e8e4dd]/35 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
