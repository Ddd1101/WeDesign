import { useState } from "react";
import type {
  BeadCategory,
  CrystalBead,
  Accessory,
  AccessoryCategory,
} from "@/types";
import { useStudioStore } from "@/store/studioStore";
import CategoryFilter from "./CategoryFilter";
import BeadItem from "./BeadItem";
import AccessoryItem from "./AccessoryItem";
import BeadDetail from "./BeadDetail";
import ImageUpload from "./ImageUpload";
import { Plus } from "lucide-react";

type Tab = "beads" | "accessories";

const accessoryCategoryList: { key: AccessoryCategory; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "金属隔珠", label: "金属隔珠" },
  { key: "吊坠", label: "吊坠" },
  { key: "挂饰", label: "挂饰" },
];

export default function BeadPanel() {
  const [tab, setTab] = useState<Tab>("beads");
  const [beadCategory, setBeadCategory] = useState<BeadCategory>("all");
  const [accCategory, setAccCategory] = useState<AccessoryCategory>("all");
  const [detailBead, setDetailBead] = useState<CrystalBead | null>(null);
  const [detailAcc, setDetailAcc] = useState<Accessory | null>(null);
  const [showBeadUpload, setShowBeadUpload] = useState(false);
  const [showAccUpload, setShowAccUpload] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const {
    beadLibrary,
    accessoryLibrary,
    addBead,
    addAccessory,
    addCustomBead,
    addCustomAccessory,
    setSelectedItem,
    selectedItem,
  } = useStudioStore();

  const filteredBeads =
    beadCategory === "all"
      ? beadLibrary
      : beadLibrary.filter((b) => b.category === beadCategory);

  const filteredAccessories =
    accCategory === "all"
      ? accessoryLibrary
      : accessoryLibrary.filter((a) => a.category === accCategory);

  const handleBeadClick = (bead: CrystalBead) => {
    setDetailBead(bead);
  };

  const handleAccClick = (acc: Accessory) => {
    setDetailAcc(acc);
    setSelectedItem(acc);
  };

  const handleBeadSelect = (bead: CrystalBead) => {
    setSelectedItem(bead);
  };

  const handleBeadImageUpload = (dataUrl: string) => {
    const newBead = addCustomBead("自定义珠子", dataUrl, "白水晶");
    setDetailBead(newBead);
    setShowBeadUpload(false);
  };

  const handleAccImageUpload = (dataUrl: string) => {
    const newAcc = addCustomAccessory("自定义配件", dataUrl, "挂饰");
    setDetailAcc(newAcc);
    setShowAccUpload(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#1a0a2e]/50 backdrop-blur-sm border-r border-white/5">
      {/* 标签页切换 */}
      <div className="flex border-b border-white/5">
        <button
          onClick={() => setTab("beads")}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            tab === "beads"
              ? "text-[#d4a843] border-b-2 border-[#d4a843]"
              : "text-[#f8f0e3]/50 hover:text-[#f8f0e3]/80"
          }`}
        >
          珠子
        </button>
        <button
          onClick={() => setTab("accessories")}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            tab === "accessories"
              ? "text-[#d4a843] border-b-2 border-[#d4a843]"
              : "text-[#f8f0e3]/50 hover:text-[#f8f0e3]/80"
          }`}
        >
          配件
        </button>
      </div>

      {/* 分类筛选和上传按钮 */}
      <div className="p-3 space-y-2 border-b border-white/5">
        {tab === "beads" ? (
          <>
            <CategoryFilter active={beadCategory} onChange={setBeadCategory} />
            <button
              onClick={() => setShowBeadUpload(!showBeadUpload)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#d4a843]/60 hover:text-[#d4a843] transition-colors"
            >
              <Plus className="w-3 h-3" />
              添加自定义珠子
            </button>
            {showBeadUpload && (
              <div className="pt-2">
                <ImageUpload onUpload={handleBeadImageUpload} />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-1.5">
              {accessoryCategoryList.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setAccCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                    accCategory === cat.key
                      ? "bg-[#d4a843]/20 text-[#d4a843] border border-[#d4a843]/40 shadow-[0_0_10px_rgba(212,168,67,0.1)]"
                      : "bg-white/5 text-[#f8f0e3]/50 border border-transparent hover:text-[#f8f0e3]/80 hover:bg-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAccUpload(!showAccUpload)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#d4a843]/60 hover:text-[#d4a843] transition-colors"
            >
              <Plus className="w-3 h-3" />
              添加自定义配件
            </button>
            {showAccUpload && (
              <div className="pt-2">
                <ImageUpload onUpload={handleAccImageUpload} />
              </div>
            )}
          </>
        )}
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "beads" ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredBeads.map((bead) => (
              <BeadItem
                key={bead.id}
                bead={bead}
                onClick={handleBeadSelect}
                isActive={
                  selectedItem &&
                  "shape" in selectedItem &&
                  selectedItem.id === bead.id
                }
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filteredAccessories.map((acc) => (
              <AccessoryItem
                key={acc.id}
                accessory={acc}
                onClick={handleAccClick}
                isActive={
                  selectedItem &&
                  "type" in selectedItem &&
                  selectedItem.id === acc.id
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* 详情弹窗 */}
      {detailBead && (
        <BeadDetail
          bead={detailBead}
          onClose={() => setDetailBead(null)}
          onAdd={(b) => {
            addBead(b);
            setDetailBead(null);
          }}
        />
      )}
      {detailAcc && (
        <BeadDetail
          accessory={detailAcc}
          onClose={() => setDetailAcc(null)}
          onAdd={() => {
            addAccessory(detailAcc);
            setDetailAcc(null);
          }}
        />
      )}
    </div>
  );
}
