import { useNavigate } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import type { BraceletDesign } from "@/types";
import { useStudioStore } from "@/store/studioStore";
import BraceletPreview from "./BraceletPreview";

interface Props {
  design: BraceletDesign;
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

export default function DesignCard({
  design,
  showActions = false,
  onDelete,
}: Props) {
  const navigate = useNavigate();
  const loadDesign = useStudioStore((s) => s.loadDesign);

  const handleEdit = () => {
    loadDesign(design);
    navigate("/studio");
  };

  const itemCount = design.items?.length || 0;

  return (
    <div className="group relative bg-white/[0.02] rounded-2xl border border-white/[0.04] overflow-hidden hover:border-[#c9a04e]/30 transition-all duration-500 hover:bg-white/[0.04]">
      {/* 预览区域 */}
      <div className="p-6 flex items-center justify-center min-h-[160px]">
        <BraceletPreview items={design.items || []} size={120} />
      </div>

      {/* 信息 */}
      <div className="px-5 pb-5">
        <h3 className="text-[#e8e4dd] font-medium mb-1 truncate tracking-wide">
          {design.name}
        </h3>
        <p className="text-xs text-[#e8e4dd]/30">
          {itemCount} 个元素 ·{" "}
          {new Date(design.createdAt).toLocaleDateString("zh-CN")}
        </p>
      </div>

      {/* 悬停操作 */}
      {showActions && (
        <div className="absolute inset-0 bg-[#0a0a0f]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#c9a04e] text-[#0a0a0f] rounded-full text-sm font-semibold hover:bg-[#d4a853] transition-all tracking-wide"
          >
            <ArrowRight className="w-4 h-4" />
            编辑
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(design.id)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-red-500/15 text-red-400 rounded-full text-sm hover:bg-red-500/25 transition-all"
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