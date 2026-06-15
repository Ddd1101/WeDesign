import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#d4a843]/15 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e8b4c8]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4a843]/30 bg-[#d4a843]/5 mb-8">
          <Sparkles className="w-4 h-4 text-[#d4a843]" />
          <span className="text-sm text-[#d4a843]/80 tracking-wide">设计属于你的能量手链</span>
        </div>

        <h1 className="font-['Playfair_Display',serif] text-5xl md:text-7xl font-bold text-[#f8f0e3] mb-6 leading-tight">
          水晶手链
          <br />
          <span className="text-[#d4a843]">DIY 设计工坊</span>
        </h1>

        <p className="text-lg text-[#f8f0e3]/60 max-w-xl mx-auto mb-10 leading-relaxed">
          挑选你的专属水晶珠，自由排列组合，创造独一无二的能量手链。
          每一颗水晶都承载着独特的寓意与能量。
        </p>

        <Link
          to="/studio"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#b8860b] text-[#1a0a2e] font-semibold rounded-full text-lg hover:shadow-[0_0_30px_rgba(212,168,67,0.4)] hover:scale-105 transition-all duration-300"
        >
          <Sparkles className="w-5 h-5" />
          开始创作
        </Link>

        {/* 装饰珠子 */}
        <div className="mt-16 flex justify-center gap-3">
          {['#9b59b6', '#f0a0b8', '#5b9bd5', '#5daa68', '#f5d442', '#1c1c1c', '#f5f0ff'].map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-float"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 12px ${color}80`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}