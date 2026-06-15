import { Link } from 'react-router-dom';
import DesignCard from './DesignCard';
import type { BraceletDesign } from '@/types';

const featuredDesigns: BraceletDesign[] = [
  {
    id: 'demo-1',
    name: '紫韵流光',
    items: [
      { kind: 'bead', id: 'd1b1', beadId: 'b1', position: 0,
        bead: { id: 'b1', name: '紫水晶', color: '紫色', category: '紫水晶', shape: 'round', size: 8, meaning: '平静心灵', colorHex: '#9b59b6' } },
      { kind: 'bead', id: 'd1b2', beadId: 'a1', position: 1,
        bead: { id: 'a1-x', name: '金色隔珠', color: '金色', category: '紫水晶', shape: 'round', size: 6, meaning: '', colorHex: '#d4a843' } },
      { kind: 'bead', id: 'd1b3', beadId: 'b3', position: 2,
        bead: { id: 'b3', name: '粉晶', color: '粉色', category: '粉晶', shape: 'round', size: 8, meaning: '招桃花', colorHex: '#f0a0b8' } },
      { kind: 'bead', id: 'd1b4', beadId: 'b7', position: 3,
        bead: { id: 'b7', name: '白水晶', color: '白色', category: '白水晶', shape: 'round', size: 8, meaning: '净化能量', colorHex: '#f5f0ff' } },
      { kind: 'bead', id: 'd1b5', beadId: 'b9', position: 4,
        bead: { id: 'b9', name: '黄水晶', color: '金色', category: '黄水晶', shape: 'round', size: 8, meaning: '招财', colorHex: '#f5d442' } },
    ] as BraceletDesign['items'],
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'demo-2',
    name: '金辉护佑',
    items: [
      { kind: 'bead', id: 'd2b1', beadId: 'b5', position: 0,
        bead: { id: 'b5', name: '黑曜石', color: '黑色', category: '黑曜石', shape: 'round', size: 8, meaning: '辟邪护身', colorHex: '#1c1c1c' } },
      { kind: 'bead', id: 'd2b2', beadId: 'b9', position: 1,
        bead: { id: 'b9', name: '黄水晶', color: '金色', category: '黄水晶', shape: 'round', size: 8, meaning: '招财', colorHex: '#f5d442' } },
      { kind: 'bead', id: 'd2b3', beadId: 'b5', position: 2,
        bead: { id: 'b5', name: '黑曜石', color: '黑色', category: '黑曜石', shape: 'round', size: 8, meaning: '辟邪护身', colorHex: '#1c1c1c' } },
      { kind: 'bead', id: 'd2b4', beadId: 'b9', position: 3,
        bead: { id: 'b9', name: '黄水晶', color: '金色', category: '黄水晶', shape: 'round', size: 8, meaning: '招财', colorHex: '#f5d442' } },
      { kind: 'bead', id: 'd2b5', beadId: 'b16', position: 4,
        bead: { id: 'b16', name: '金曜石', color: '金黑色', category: '黑曜石', shape: 'round', size: 8, meaning: '招财纳福', colorHex: '#3a3020' } },
    ] as BraceletDesign['items'],
    createdAt: '2025-12-02',
    updatedAt: '2025-12-02',
  },
  {
    id: 'demo-3',
    name: '碧波清心',
    items: [
      { kind: 'bead', id: 'd3b1', beadId: 'b11', position: 0,
        bead: { id: 'b11', name: '绿玛瑙', color: '绿色', category: '绿玛瑙', shape: 'round', size: 8, meaning: '健康平安', colorHex: '#5daa68' } },
      { kind: 'bead', id: 'd3b2', beadId: 'b13', position: 1,
        bead: { id: 'b13', name: '蓝晶石', color: '蓝色', category: '蓝晶石', shape: 'round', size: 8, meaning: '提升沟通力', colorHex: '#5b9bd5' } },
      { kind: 'bead', id: 'd3b3', beadId: 'b7', position: 2,
        bead: { id: 'b7', name: '白水晶', color: '白色', category: '白水晶', shape: 'round', size: 8, meaning: '净化能量', colorHex: '#f5f0ff' } },
      { kind: 'bead', id: 'd3b4', beadId: 'b11', position: 3,
        bead: { id: 'b11', name: '绿玛瑙', color: '绿色', category: '绿玛瑙', shape: 'round', size: 8, meaning: '健康平安', colorHex: '#5daa68' } },
      { kind: 'bead', id: 'd3b5', beadId: 'b15', position: 4,
        bead: { id: 'b15', name: '月光石', color: '月白色', category: '白水晶', shape: 'round', size: 8, meaning: '提升魅力', colorHex: '#d5c8e8' } },
    ] as BraceletDesign['items'],
    createdAt: '2025-12-03',
    updatedAt: '2025-12-03',
  },
];

export default function FeaturedDesigns() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#f8f0e3] mb-4">
            精选设计
          </h2>
          <p className="text-[#f8f0e3]/50 max-w-lg mx-auto">
            探索精美的手链设计，获取灵感，开始你的创作之旅
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDesigns.map((d) => (
            <DesignCard key={d.id} design={d} showActions />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4a843]/30 rounded-full text-[#d4a843] hover:bg-[#d4a843]/10 transition-all duration-300"
          >
            查看全部作品
          </Link>
        </div>
      </div>
    </section>
  );
}