import { Undo2, Redo2, Trash2, Save, Download } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';

interface Props {
  onSave: () => void;
}

export default function Toolbar({ onSave }: Props) {
  const { currentBeads, undo, redo, clearAll } = useStudioStore();

  return (
    <div className="flex items-center gap-2 p-3 bg-[#1a0a2e]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
      <button
        onClick={undo}
        className="p-2.5 rounded-xl text-[#f8f0e3]/60 hover:text-[#f8f0e3] hover:bg-white/10 transition-all"
        title="撤销"
      >
        <Undo2 className="w-5 h-5" />
      </button>
      <button
        onClick={redo}
        className="p-2.5 rounded-xl text-[#f8f0e3]/60 hover:text-[#f8f0e3] hover:bg-white/10 transition-all"
        title="重做"
      >
        <Redo2 className="w-5 h-5" />
      </button>

      <div className="w-px h-6 bg-white/10" />

      <button
        onClick={clearAll}
        className="p-2.5 rounded-xl text-[#f8f0e3]/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
        title="清空"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="w-px h-6 bg-white/10" />

      {/* 珠子计数 */}
      <div className="px-3 py-1.5 text-sm text-[#f8f0e3]/50">
        {currentBeads.length} 颗珠子
      </div>

      <div className="flex-1" />

      <button
        onClick={onSave}
        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#d4a843] to-[#b8860b] text-[#1a0a2e] rounded-xl text-sm font-semibold hover:shadow-[0_0_20px_rgba(212,168,67,0.3)] transition-all"
      >
        <Save className="w-4 h-4" />
        保存
      </button>
      <button
        className="flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-xl text-[#f8f0e3]/70 text-sm hover:bg-white/5 transition-all"
        title="分享"
      >
        <Download className="w-4 h-4" />
        分享
      </button>
    </div>
  );
}