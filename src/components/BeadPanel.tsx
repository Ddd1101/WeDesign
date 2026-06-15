import { useState } from "react";
import type { BeadCategory, CrystalBead } from "@/types";
import { useStudioStore } from "@/store/studioStore";
import CategoryFilter from "./CategoryFilter";
import BeadItem from "./BeadItem";
import BeadDetail from "./BeadDetail";

export default function BeadPanel() {
  const [category, setCategory] = useState<BeadCategory>("all");
  const [detailBead, setDetailBead] = useState<CrystalBead | null>(null);
  const { beadLibrary, addBead } = useStudioStore();

  const filtered =
    category === "all"
      ? beadLibrary
      : beadLibrary.filter((b) => b.category === category);

  const handleBeadClick = (bead: CrystalBead) => {
    setDetailBead(bead);
  };

  const handleAdd = (bead: CrystalBead) => {
    addBead(bead);
    setDetailBead(null);
  };

  return (
    <div className="h-full flex flex-col bg-[#1a0a2e]/50 backdrop-blur-sm border-r border-white/5">
      <div className="p-4 border-b border-white/5">
        <h3 className="font-['Playfair_Display',serif] text-[#f8f0e3] text-lg mb-3">
          水晶珠子
        </h3>
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((bead) => (
            <BeadItem key={bead.id} bead={bead} onClick={handleBeadClick} />
          ))}
        </div>
      </div>

      {detailBead && (
        <BeadDetail
          bead={detailBead}
          onClose={() => setDetailBead(null)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
