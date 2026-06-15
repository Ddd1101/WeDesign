import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onSave: (name: string) => void;
  onClose: () => void;
}

export default function SaveModal({ onSave, onClose }: Props) {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#1e0e38] border border-[#d4a843]/20 rounded-2xl p-6 w-[360px] max-w-[90vw] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-['Playfair_Display',serif] text-[#f8f0e3] text-xl font-bold">保存设计</h3>
          <button onClick={onClose} className="text-[#f8f0e3]/40 hover:text-[#f8f0e3] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="给你的手链起个名字..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#f8f0e3] placeholder-[#f8f0e3]/30 outline-none focus:border-[#d4a843]/50 transition-colors mb-5"
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-white/10 rounded-xl text-[#f8f0e3]/60 hover:text-[#f8f0e3] hover:bg-white/5 transition-all"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-2.5 bg-gradient-to-r from-[#d4a843] to-[#b8860b] text-[#1a0a2e] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(212,168,67,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}