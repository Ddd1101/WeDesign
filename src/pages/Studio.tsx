import { useState } from "react";
import { useStudioStore } from "@/store/studioStore";
import BeadPanel from "@/components/BeadPanel";
import BraceletCanvas from "@/components/BraceletCanvas";
import Toolbar from "@/components/Toolbar";
import SizeSettings from "@/components/SizeSettings";
import SaveModal from "@/components/SaveModal";

export default function Studio() {
  const [showSave, setShowSave] = useState(false);
  const saveDesign = useStudioStore((s) => s.saveDesign);

  const handleSave = (name: string) => {
    saveDesign(name);
  };

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col pt-16">
      {/* 工具栏 */}
      <div className="px-4 py-2 flex justify-center gap-3">
        <Toolbar onSave={() => setShowSave(true)} />
        <SizeSettings />
      </div>

      {/* 主区域 */}
      <div className="flex-1 flex overflow-hidden bg-grid">
        {/* 左侧珠子面板 */}
        <div className="w-72 flex-shrink-0 hidden md:block">
          <BeadPanel />
        </div>

        {/* 中间画布 */}
        <BraceletCanvas />

        {/* 移动端底部珠子选择器 */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass h-44 overflow-y-auto p-2 space-y-2">
          <SizeSettings />
          <BeadPanel />
        </div>
      </div>

      {/* 保存弹窗 */}
      {showSave && (
        <SaveModal onSave={handleSave} onClose={() => setShowSave(false)} />
      )}
    </div>
  );
}
