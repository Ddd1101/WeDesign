# Tasks

- [x] Task 1: 扩展数据模型和 Store
  - [x] 1.1 扩展 `CrystalBead` 接口，新增 `imageDataUrl?: string` 字段
  - [x] 1.2 新增 `Accessory` 和 `StudioItem` 类型（配件类型 + 画布上珠子和配件的联合类型）
  - [x] 1.3 在 `studioStore.ts` 中扩展：支持 `StudioItem[]`（珠子和配件混合），新增 `addAccessory`、`updateItemImage`、`moveItem`、`insertItemAt` 方法
  - [x] 1.4 新增默认配件数据 `src/data/accessories.ts`

- [x] Task 2: 创建图片上传组件
  - [x] 2.1 创建 `src/components/ImageUpload.tsx` — 通用图片上传组件（文件选择、缩略图预览、base64 编码）
  - [x] 2.2 支持拖拽或点击上传，限制文件类型和大小（最大 2MB）

- [x] Task 3: 更新珠子和配件展示组件
  - [x] 3.1 重构 `BeadItem.tsx`：支持展示图片缩略图（有图片时显示图片，无图片时降级为纯色圆）
  - [x] 3.2 创建 `AccessoryItem.tsx`：配件展示组件，结构与 BeadItem 类似但使用不同形状标识
  - [x] 3.3 重构 `BeadPanel.tsx`：新增「珠子/配件」标签页切换，每个标签页都有「添加自定义」按钮，配件列表使用 AccessoryItem
  - [x] 3.4 更新 `BeadDetail.tsx`：支持展示配件详情，支持自定义上传按钮

- [x] Task 4: 重构手链画布支持自由拖拽排列
  - [x] 4.1 重构 `BraceletCanvas.tsx`：使用鼠标事件（mousedown/mousemove/mouseup）实现拖拽，画布元素渲染图片或降级色块
  - [x] 4.2 实现 `moveItem(from, to)` 逻辑：拖拽珠子到新位置，其他珠子自动重排间距
  - [x] 4.3 实现 `insertItemAt(position)` 逻辑：点击画布空白处插入选中珠子/配件
  - [x] 4.4 更新 `BraceletPreview.tsx`：支持图片渲染
  - [x] 4.5 Studio 页面：添加「选中项」状态指示器，展示当前选中的珠子/配件

- [x] Task 5: 验证和收尾
  - [x] 5.1 运行 `npm run check` 确保 TypeScript 类型检查通过
  - [x] 5.2 删除不再使用的旧代码（纯色渲染相关字段保留作为降级方案）

# Task Dependencies
- Task 2 依赖 Task 1（需要新类型定义）
- Task 3 依赖 Task 1、2
- Task 4 依赖 Task 1
- Task 5 依赖 Task 3、4
- Task 2 和 Task 4 可并行执行