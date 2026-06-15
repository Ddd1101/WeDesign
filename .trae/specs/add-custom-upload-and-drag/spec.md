# 水晶珠子和配件自定义上传 + 自由拖拽排列 Spec

## Why
当前系统使用纯色圆形模拟水晶珠子，视觉效果不够真实，且不支持配件（隔珠、吊坠等）。同时串珠排列无法自定义位置，用户只能按添加顺序排列，无法自由拖拽调整每颗珠子的位置。

## What Changes
- 水晶珠子支持用户自定义上传图片，替代纯色渲染
- 新增配件类型（隔珠、吊坠、挂饰等），同样支持自定义上传图片
- 手链画布重构，支持每颗珠子/配件自由拖拽到任意位置
- 数据模型扩展以支持配件类型和图片 URL
- **BREAKING**: `CrystalBead` 接口新增 `imageUrl` 字段，原 `colorHex` 保留作为降级方案

## Impact
- Affected specs: 无（首个 spec）
- Affected code:
  - `src/types/index.ts` — 新增 `Accessory` 类型，扩展 `CrystalBead`
  - `src/data/beads.ts` — 新增默认配件数据
  - `src/store/studioStore.ts` — 支持配件混合排列，支持位置自由指定
  - `src/components/BeadItem.tsx` — 支持图片渲染 + 配件子组件
  - `src/components/BeadPanel.tsx` — 新增配件标签页
  - `src/components/BraceletCanvas.tsx` — 支持自由拖拽定位
  - `src/components/BeadDetail.tsx` — 支持配件详情
  - `src/components/BraceletPreview.tsx` — 支持图片渲染
  - 新增 `src/components/ImageUpload.tsx` — 通用图片上传组件
  - 新增 `src/components/AccessoryItem.tsx` — 配件展示组件

## ADDED Requirements

### Requirement: 水晶珠子自定义图片上传
用户 SHALL 能够为水晶珠子上传自定义图片，上传后珠子以真实图片渲染在手链画布上。

#### Scenario: 上传珠子图片
- **WHEN** 用户在珠子面板点击「添加自定义珠子」
- **THEN** 弹出文件选择器，接受 png/jpg/webp 格式
- **AND** 选择图片后生成缩略图预览
- **AND** 珠子卡片由纯色圆改为图片缩略图展示

#### Scenario: 未上传图片的降级
- **WHEN** 珠子未上传自定义图片
- **THEN** 系统使用原 `colorHex` 纯色圆作为降级展示

### Requirement: 配件支持
系统 SHALL 支持配件类型（隔珠、吊坠、挂饰），配件与珠子可在同一手链中混合排列。

#### Scenario: 添加配件
- **WHEN** 用户在面板切换到「配件」标签页
- **THEN** 展示默认配件列表（金属隔珠、吊坠等）
- **AND** 用户点击配件可添加到当前手链设计

#### Scenario: 配件自定义上传
- **WHEN** 用户点击「添加自定义配件」
- **THEN** 弹出文件选择器
- **AND** 上传后配件展示在配件列表中

### Requirement: 自由拖拽排列
用户 SHALL 能够在手链画布上自由拖拽任意珠子或配件到期望的圆环位置。

#### Scenario: 拖拽调整位置
- **WHEN** 用户在手链画布上长按某颗珠子并拖拽
- **THEN** 珠子跟随鼠标/手指移动，显示半透明拖拽预览
- **AND** 松开后珠子插入到目标位置
- **AND** 其他珠子自动重新排列间距

#### Scenario: 点击直接指定位置
- **WHEN** 用户在画布空白处点击
- **THEN** 若有选中的珠子/配件，则添加到对应位置
- **AND** 若无选中项，则不触发任何操作

## MODIFIED Requirements
无（首个 spec）。

## REMOVED Requirements
无（首个 spec）。