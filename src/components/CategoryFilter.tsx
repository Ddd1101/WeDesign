import type { BeadCategory } from "@/types";

const categories: { key: BeadCategory; label: string; color: string }[] = [
  { key: "all", label: "全部", color: "#c9a04e" },
  { key: "紫水晶", label: "紫水晶", color: "#9b59b6" },
  { key: "粉晶", label: "粉晶", color: "#f0a0b8" },
  { key: "黑曜石", label: "黑曜石", color: "#555" },
  { key: "白水晶", label: "白水晶", color: "#e8e0f0" },
  { key: "黄水晶", label: "黄水晶", color: "#f5d442" },
  { key: "绿玛瑙", label: "绿玛瑙", color: "#5daa68" },
  { key: "蓝晶石", label: "蓝晶石", color: "#5b9bd5" },
];

interface Props {
  active: BeadCategory;
  onChange: (cat: BeadCategory) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`px-3 py-1.5 rounded-full text-xs tracking-wide transition-all duration-300 ${
            active === cat.key
              ? "bg-[#c9a04e]/15 text-[#c9a04e] border border-[#c9a04e]/30"
              : "bg-white/[0.03] text-[#e8e4dd]/40 border border-white/[0.04] hover:text-[#e8e4dd]/70 hover:bg-white/[0.06]"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}