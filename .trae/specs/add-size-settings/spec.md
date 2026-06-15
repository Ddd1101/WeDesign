# 手腕周长和串珠尺寸设置 Spec

## Why
当前系统的手链画布使用固定半径（`size * 0.7 / 2`）和固定的珠子大小（根据数量自动计算），无法真实反映不同手腕周长和串珠尺寸的实际效果。用户需要能够设置手腕周长（例如 14cm、16cm、18cm）和单颗珠子尺寸（例如 6mm、8mm、10mm），画布应根据这些参数动态调整手链圈的大小和珠子大小，以提供更真实的预览效果。

## What Changes
- `BraceletDesign` 接口新增 `wristSize`（手腕周长，单位 mm）和 `beadSize`（珠子直径，单位 mm）字段
- Store 新增 `wristSize`、`beadSize` 状态及对应的 setter 方法
- 画布根据 `wristSize` 动态计算手链圈半径，根据 `beadSize` 动态计算单颗珠子像素大小
- 新增尺寸设置面板组件，提供手腕周长选择器和珠子尺寸选择器
- 勾勒出手腕周长与珠子尺寸之间的约束关系（珠子数 × 珠子直径 ≤ 手链周长）

## Impact
- Affected specs: 无（独立新增）
- Affected code:
  - `src/types/index.ts` — `BraceletDesign` 新增 `wristSize` 和 `beadSize` 字段
  - `src/store/studioStore.ts` — 新增 `wristSize`、`beadSize` 状态和 `setWristSize`、`setBeadSize` 方法
  - `src/components/BraceletCanvas.tsx` — 画布半径和珠子大小改为由 store 中的 size 参数驱动
  - `src/pages/Studio.tsx` — 引入尺寸设置组件
  - 新增 `src/components/SizeSettings.tsx` — 手腕周长和珠子尺寸选择组件

## ADDED Requirements

### Requirement: 手腕周长设置
用户 SHALL 能够在设计手链时设置手腕周长，画布根据周长动态调整手链圈的显示大小。

#### Scenario: 选择手腕周长
- **WHEN** 用户在尺寸设置面板中选择手腕周长（如 14cm / 16cm / 18cm / 自定义）
- **THEN** 手链画布上的手链圈半径同步变化
- **AND** 珠子在圈上的位置和间距自动重新计算

#### Scenario: 默认手腕周长
- **WHEN** 用户首次进入设计页面
- **THEN** 手腕周长默认为 160mm（16cm）

### Requirement: 珠子尺寸设置
用户 SHALL 能够设置单颗珠子的直径大小，画布上的珠子像素大小根据该参数动态调整。

#### Scenario: 选择珠子尺寸
- **WHEN** 用户在尺寸设置面板中选择珠子尺寸（如 6mm / 8mm / 10mm / 12mm）
- **THEN** 画布上所有珠子的大小同步变化
- **AND** 若珠子总数 × 珠子直径超过手腕周长，系统提示用户冲突

#### Scenario: 默认珠子尺寸
- **WHEN** 用户首次进入设计页面
- **THEN** 珠子尺寸默认为 8mm

### Requirement: 尺寸约束提示
系统 SHALL 在珠子数量 × 珠子直径超过手腕周长时，向用户发出视觉提示。

#### Scenario: 尺寸冲突警告
- **WHEN** 当前珠子数量 × 珠子直径 > 手腕周长
- **THEN** 在尺寸设置面板中显示警告图标和文字提示
- **AND** 画布上仍正常渲染（不阻止用户操作）

### Requirement: 尺寸配置随设计保存和加载
手腕周长和珠子尺寸 SHALL 作为设计的一部分保存到 LocalStorage，加载设计时恢复。

#### Scenario: 保存设计时包含尺寸
- **WHEN** 用户保存手链设计
- **THEN** 保存的数据包含 `wristSize` 和 `beadSize` 当前值

#### Scenario: 加载设计时恢复尺寸
- **WHEN** 用户从收藏夹加载已有设计
- **THEN** 手腕周长和珠子尺寸恢复为保存时的值
- **AND** 画布按保存的尺寸参数渲染

## MODIFIED Requirements
无。

## REMOVED Requirements
无。