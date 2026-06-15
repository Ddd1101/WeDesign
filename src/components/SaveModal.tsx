import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  onSave: (name: string) => void;
  onClose: () => void;
}

export default function SaveModal({ onSave, onClose }: Props) {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#12121a] border border-white/[0.06] rounded-2xl p-6 w-[380px] max-w-[90vw] shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-[#e8e4dd] text-xl tracking-wide">
            保存设计
          </h3>
          <button
            onClick={onClose}
            className="text-[#e8e4dd]/30 hover:text-[#e8e4dd]/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="给你的手链起个名字..."
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[#e8e4dd] placeholder-[#e8e4dd]/25 outline-none focus:border-[#c9a04e]/40 focus:bg-white/[0.05] transition-all mb-6"
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-white/[0.08] rounded-xl text-[#e8e4dd]/40 hover:text-[#e8e4dd]/70 hover:bg-white/[0.04] transition-all text-sm"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-2.5 bg-[#c9a04e] text-[#0a0a0f] font-semibold rounded-xl hover:bg-[#d4a853] hover:shadow-[0_0_20px_rgba(201,160,78,0.25)] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm tracking-wide"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}