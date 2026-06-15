import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trash2 } from 'lucide-react';
import type { BraceletDesign } from '@/types';
import { useStudioStore } from '@/store/studioStore';
import BraceletPreview from './BraceletPreview';

interface Props {
  design: BraceletDesign;
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

export default function DesignCard({ design, showActions = false, onDelete }: Props) {
  const navigate = useNavigate();
  const loadDesign = useStudioStore((s) => s.loadDesign);

  const handleEdit = () => {
    loadDesign(design);
    navigate('/studio');
  };

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-[#d4a843]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,168,67,0.1)]">
      <div className="p-6 flex items-center justify-center min-h-[160px] bg-gradient-to-b from-transparent to-[#1a0a2e]/40">
        <BraceletPreview beads={design.beads} size={120} />
      </div>

      <div className="p-4 border-t border-white/5">
        <h3 className="font-['Playfair_Display',serif] text-[#f8f0e3] text-lg mb-1 truncate">
          {design.name}
        </h3>
        <p className="text-xs text-[#f8f0e3]/40">
          {design.beads.length} 颗珠子 · {new Date(design.createdAt).toLocaleDateString('zh-CN')}
        </p>
      </div>

      {showActions && (
        <div className="absolute inset-0 bg-[#1a0a2e]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-4 py-2 bg-[#d4a843] text-[#1a0a2e] rounded-full text-sm font-semibold hover:shadow-[0_0_20px_rgba(212,168,67,0.4)] transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            编辑
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(design.id)}
              className="flex items-center gap-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm hover:bg-red-500/30 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              删除
            </button>
          )}
        </div>
      )}
    </div>
  );
}