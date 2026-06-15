import type { BeadCategory } from '@/types';

const categories: { key: BeadCategory; label: string; color: string }[] = [
  { key: 'all', label: '全部', color: '#d4a843' },
  { key: '紫水晶', label: '紫水晶', color: '#9b59b6' },
  { key: '粉晶', label: '粉晶', color: '#f0a0b8' },
  { key: '黑曜石', label: '黑曜石', color: '#555' },
  { key: '白水晶', label: '白水晶', color: '#e8e0f0' },
  { key: '黄水晶', label: '黄水晶', color: '#f5d442' },
  { key: '绿玛瑙', label: '绿玛瑙', color: '#5daa68' },
  { key: '蓝晶石', label: '蓝晶石', color: '#5b9bd5' },
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
          className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
            active === cat.key
              ? 'bg-[#d4a843]/20 text-[#d4a843] border border-[#d4a843]/40 shadow-[0_0_10px_rgba(212,168,67,0.1)]'
              : 'bg-white/5 text-[#f8f0e3]/50 border border-transparent hover:text-[#f8f0e3]/80 hover:bg-white/10'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}