# Tasks

- [x] Task 1: 扩展数据模型和 Store
  - [x] 1.1 `BraceletDesign` 接口新增 `wristSize?: number` 和 `beadSize?: number` 字段（单位 mm）
  - [x] 1.2 Store 新增 `wristSize`（默认 160）和 `beadSize`（默认 8）状态
  - [x] 1.3 Store 新增 `setWristSize(size: number)` 和 `setBeadSize(size: number)` 方法
  - [x] 1.4 `saveDesign` 保存时包含 `wristSize` 和 `beadSize`
  - [x] 1.5 `loadDesign` 加载时恢复 `wristSize` 和 `beadSize`，未保存时使用默认值

- [x] Task 2: 创建尺寸设置组件
  - [x] 2.1 创建 `src/components/SizeSettings.tsx` — 手腕周长和珠子尺寸选择面板
  - [x] 2.2 手腕周长：提供预设选项按钮（140mm / 160mm / 180mm）+ 可输入自定义值
  - [x] 2.3 珠子尺寸：提供预设选项按钮（6mm / 8mm / 10mm / 12mm）
  - [x] 2.4 尺寸冲突检测：珠子总数 × 珠子直径 > 手腕周长时显示警告

- [x] Task 3: 更新画布渲染逻辑
  - [x] 3.1 `BraceletCanvas` 从 store 读取 `wristSize` 和 `beadSize`
  - [x] 3.2 手链圈半径根据 `wristSize` 动态计算：将周长映射为画布像素半径
  - [x] 3.3 单个珠子像素大小根据 `beadSize` 动态计算
  - [x] 3.4 保留最小/最大边界，防止极端数值导致渲染异常

- [x] Task 4: 集成到 Studio 页面
  - [x] 4.1 在 Studio 页面中引入 `SizeSettings` 组件，放置于工具栏右侧或画布上方
  - [x] 4.2 确保移动端也能访问尺寸设置（放置在合适位置）

- [x] Task 5: 验证
  - [x] 5.1 运行 `npm run check` 确保 TypeScript 类型检查通过
  - [x] 5.2 验证保存/加载设计时尺寸配置正确恢复
  - [x] 5.3 验证尺寸冲突警告正确显示

# Task Dependencies
- Task 2 依赖 Task 1（需要新的 store 状态和方法）
- Task 3 依赖 Task 1（需要从 store 读取 size 参数）
- Task 4 依赖 Task 2（需要 SizeSettings 组件）
- Task 5 依赖 Task 3、4
- Task 2 和 Task 3 可并行执行