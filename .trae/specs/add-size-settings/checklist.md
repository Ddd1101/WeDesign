# Checklist

- [x] `BraceletDesign` 接口包含 `wristSize` 和 `beadSize` 可选字段
- [x] Store 包含 `wristSize`（默认 160mm）和 `beadSize`（默认 8mm）状态
- [x] Store 包含 `setWristSize` 和 `setBeadSize` 方法
- [x] `saveDesign` 保存时写入 `wristSize` 和 `beadSize`
- [x] `loadDesign` 加载时正确恢复 `wristSize` 和 `beadSize`
- [x] SizeSettings 组件提供手腕周长预设选项（140/160/180mm）
- [x] SizeSettings 组件提供珠子尺寸预设选项（6/8/10/12mm）
- [x] 尺寸冲突（珠子总数 × 珠子直径 > 手腕周长）时显示警告
- [x] 画布手链圈半径根据 `wristSize` 动态变化
- [x] 画布单颗珠子像素大小根据 `beadSize` 动态计算
- [x] Studio 页面集成了 SizeSettings 组件
- [x] 移动端可访问尺寸设置
- [x] `npm run check` 通过，无类型错误