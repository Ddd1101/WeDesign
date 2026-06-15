import { Undo2, Redo2, Trash2, Save, Share2 } from "lucide-react";
import { useStudioStore } from "@/store/studioStore";

interface Props {
  onSave: () => void;
}

export default function Toolbar({ onSave }: Props) {
  const { currentItems, undo, redo, clearAll } = useStudioStore();

  return (
    <div className="flex items-center gap-2 p-2 glass rounded-2xl">
      <button
        onClick={undo}
        className="p-2.5 rounded-xl text-[#e8e4dd]/50 hover:text-[#e8e4dd] hover:bg-white/[0.06] transition-all"
        title="撤销"
      >
        <Undo2 className="w-4.5 h-4.5" />
      </button>
      <button
        onClick={redo}
        className="p-2.5 rounded-xl text-[#e8e4dd]/50 hover:text-[#e8e4dd] hover:bg-white/[0.06] transition-all"
        title="重做"
      >
        <Redo2 className="w-4.5 h-4.5" />
      </button>

      <div className="w-px h-5 bg-white/[0.08]" />

      <button
        onClick={clearAll}
        className="p-2.5 rounded-xl text-[#e8e4dd]/50 hover:text-red-400 hover:bg-red-500/[0.08] transition-all"
        title="清空"
      >
        <Trash2 className="w-4.5 h-4.5" />
      </button>

      <div className="w-px h-5 bg-white/[0.08]" />

      <div className="px-3 py-1.5 text-sm text-[#e8e4dd]/40 font-medium tracking-wide">
        {currentItems.length} 元素
      </div>

      <div className="flex-1" />

      <button
        onClick={onSave}
        className="flex items-center gap-1.5 px-5 py-2 bg-[#c9a04e] text-[#0a0a0f] rounded-xl text-sm font-semibold tracking-wide hover:bg-[#d4a853] transition-all hover:shadow-[0_0_24px_rgba(201,160,78,0.3)]"
      >
        <Save className="w-4 h-4" />
        保存设计
      </button>
      <button className="flex items-center gap-1.5 px-5 py-2 border border-white/[0.08] rounded-xl text-[#e8e4dd]/50 text-sm tracking-wide hover:text-[#e8e4dd]/80 hover:bg-white/[0.04] transition-all">
        <Share2 className="w-4 h-4" />
        分享
      </button>
    </div>
  );
}