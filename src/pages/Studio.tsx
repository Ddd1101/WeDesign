import { useState } from "react";
import { useStudioStore } from "@/store/studioStore";
import BeadPanel from "@/components/BeadPanel";
import BraceletCanvas from "@/components/BraceletCanvas";
import Toolbar from "@/components/Toolbar";
import SaveModal from "@/components/SaveModal";

export default function Studio() {
  const [showSave, setShowSave] = useState(false);
  const saveDesign = useStudioStore((s) => s.saveDesign);

  const handleSave = (name: string) => {
    saveDesign(name);
  };

  return (
    <div className="h-screen bg-[#0d0618] flex flex-col pt-16">
      {/* 工具栏 */}
      <div className="px-4 py-2 flex justify-center">
        <Toolbar onSave={() => setShowSave(true)} />
      </div>

      {/* 主区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧珠子面板 */}
        <div className="w-64 flex-shrink-0 hidden md:block">
          <BeadPanel />
        </div>

        {/* 中间画布 */}
        <BraceletCanvas />

        {/* 移动端底部珠子选择器 */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1a0a2e]/95 backdrop-blur-md border-t border-white/10 h-32 overflow-y-auto">
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
