import { useRef, useState, useCallback } from "react";
import { useStudioStore } from "@/store/studioStore";
import type { StudioItem } from "@/types";

export default function BraceletCanvas() {
  const { currentItems, removeItem, moveItem, insertItemAt, selectedItem } =
    useStudioStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<{
    index: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const size = 360;
  const count = currentItems.length;
  const radius = (size * 0.7) / 2;
  const beadRadius =
    count > 0
      ? Math.min((2 * Math.PI * radius) / count / 2.2, size * 0.06)
      : 14;

  const getItemAngle = (i: number) =>
    (i / Math.max(count, 1)) * 2 * Math.PI - Math.PI / 2;

  const getAngleFromPoint = useCallback(
    (clientX: number, clientY: number): number | null => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return null;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return Math.atan2(clientY - cy, clientX - cx);
    },
    [],
  );

  const getNearestPosition = useCallback(
    (clientX: number, clientY: number): number => {
      const angle = getAngleFromPoint(clientX, clientY);
      if (angle === null) return 0;
      const normalized = (angle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);
      const pos = Math.round((normalized / (2 * Math.PI)) * count);
      return Math.min(pos, count);
    },
    [count, getAngleFromPoint],
  );

  const startDrag = (clientX: number, clientY: number, index: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDragging({
      index,
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top,
    });
    setDragPos({ x: clientX, y: clientY });
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragging) return;
    setDragPos({ x: clientX, y: clientY });
  };

  const endDrag = (clientX: number, clientY: number) => {
    if (!dragging) return;
    const targetPos = getNearestPosition(clientX, clientY);
    if (targetPos !== dragging.index && targetPos !== dragging.index + 1) {
      const to = targetPos > dragging.index ? targetPos - 1 : targetPos;
      moveItem(
        dragging.index,
        Math.max(0, Math.min(to, currentItems.length - 1)),
      );
    }
    setDragging(null);
    setDragPos(null);
  };

  const cancelDrag = () => {
    setDragging(null);
    setDragPos(null);
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY, index);
  };

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    moveDrag(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    endDrag(e.clientX, e.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    endDrag(touch.clientX, touch.clientY);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (dragging) return;
    if (!selectedItem) return;
    const pos = getNearestPosition(e.clientX, e.clientY);
    insertItemAt(pos);
  };

  const renderItem = (item: StudioItem, i: number, isDragged: boolean) => {
    const angle = getItemAngle(i);
    const x = Math.cos(angle) * radius + size / 2 - beadRadius;
    const y = Math.sin(angle) * radius + size / 2 - beadRadius;
    const beadSize = beadRadius * 2;

    let imageUrl: string | undefined;
    let colorHex = "#888";
    let tooltip = "";

    if (item.kind === "bead") {
      imageUrl = item.bead.imageDataUrl;
      colorHex = item.bead.colorHex;
      tooltip = `${item.bead.name} — 拖拽移动 · 双击移除`;
    } else {
      imageUrl = item.accessory.imageDataUrl;
      colorHex = item.accessory.colorHex;
      tooltip = `${item.accessory.name} — 拖拽移动 · 双击移除`;
    }

    if (isDragged) return null;

    const style: React.CSSProperties = {
      width: beadSize,
      height: beadSize,
      left: x,
      top: y,
      backgroundColor: imageUrl ? "transparent" : colorHex,
      boxShadow: imageUrl
        ? "0 0 8px rgba(212,168,67,0.3)"
        : `0 0 12px ${colorHex}80, inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.3)`,
      border: `1px solid ${imageUrl ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.2)"}`,
      touchAction: "none",
    };

    return (
      <div
        key={item.id}
        onMouseDown={(e) => handleMouseDown(e, i)}
        onTouchStart={(e) => handleTouchStart(e, i)}
        onDoubleClick={() => removeItem(i)}
        className="absolute rounded-full cursor-grab active:cursor-grabbing group transition-transform hover:scale-125 z-10 overflow-hidden"
        style={style}
        title={tooltip}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        )}
        {!imageUrl && item.kind === "accessory" && (
          <div className="w-full h-full flex items-center justify-center text-xs text-[#f8f0e3]/60">
            {item.accessory.name.slice(0, 2)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center relative select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={cancelDrag}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={cancelDrag}
      onClick={handleCanvasClick}
    >
      {/* 选中项指示器 */}
      {selectedItem && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-[#d4a843]/15 border border-[#d4a843]/30 rounded-full text-xs text-[#d4a843] backdrop-blur-sm">
          已选中：{"name" in selectedItem ? selectedItem.name : ""}
          {" — 点击画布放置" as string}
        </div>
      )}

      {/* 背景光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative" style={{ width: size, height: size }}>
        {/* 手链线 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a843]/30"
          style={{ width: size * 0.7, height: size * 0.7 }}
        />

        {/* 位置指示点 */}
        {currentItems.length > 0 &&
          Array.from({ length: currentItems.length }).map((_, i) => {
            const angle = getItemAngle(i);
            const ix = Math.cos(angle) * radius + size / 2;
            const iy = Math.sin(angle) * radius + size / 2;
            return (
              <div
                key={`dot-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#d4a843]/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: ix, top: iy }}
              />
            );
          })}

        {/* 渲染所有已放置的元素 */}
        {currentItems.map((item, i) =>
          renderItem(item, i, dragging?.index === i),
        )}

        {/* 拖拽中的元素 */}
        {dragging && dragPos && (
          <div
            className="absolute rounded-full opacity-60 pointer-events-none z-30 overflow-hidden"
            style={{
              width: beadRadius * 2,
              height: beadRadius * 2,
              left:
                dragPos.x -
                (containerRef.current?.getBoundingClientRect().left || 0) -
                beadRadius,
              top:
                dragPos.y -
                (containerRef.current?.getBoundingClientRect().top || 0) -
                beadRadius,
              backgroundColor: (() => {
                const dItem = currentItems[dragging.index];
                if (!dItem) return "#888";
                if (dItem.kind === "bead") {
                  return dItem.bead.imageDataUrl
                    ? "transparent"
                    : dItem.bead.colorHex;
                }
                return dItem.accessory.imageDataUrl
                  ? "transparent"
                  : dItem.accessory.colorHex;
              })(),
              border: "2px solid #d4a843",
            }}
          >
            {(() => {
              const dItem = currentItems[dragging.index];
              if (dItem?.kind === "bead" && dItem.bead.imageDataUrl) {
                return (
                  <img
                    src={dItem.bead.imageDataUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                );
              }
              if (dItem?.kind === "accessory" && dItem.accessory.imageDataUrl) {
                return (
                  <img
                    src={dItem.accessory.imageDataUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                );
              }
              return null;
            })()}
          </div>
        )}

        {/* 空状态 */}
        {count === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div
              className="rounded-full border-2 border-dashed border-[#f8f0e3]/15 mb-4"
              style={{ width: size * 0.6, height: size * 0.6 }}
            />
            <p className="text-[#f8f0e3]/30 text-sm">选择珠子或配件开始设计</p>
            <p className="text-[#f8f0e3]/15 text-xs mt-1">
              拖拽调整位置 · 双击移除 · 点击画布放置
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
