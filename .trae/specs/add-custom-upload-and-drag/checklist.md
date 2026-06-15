# Checklist

- [x] CrystalBead 接口包含 `imageDataUrl` 可选字段，原 `colorHex` 字段保留
- [x] Accessory 和 StudioItem 类型定义完整，珠子和配件可在同一数组混合
- [x] Store 支持 `addAccessory`、`updateItemImage`、`moveItem`、`insertItemAt` 方法
- [x] 默认配件数据至少有 5 种（金属隔珠、吊坠等）
- [x] ImageUpload 组件支持 jpg/png/webp，限制 2MB，返回 base64 data URL
- [x] BeadItem 组件：有 imageDataUrl 时显示图片，无时显示纯色圆
- [x] AccessoryItem 组件正确渲染配件图片或默认样式
- [x] BeadPanel 有「珠子/配件」标签页切换，各标签页有「添加自定义」按钮
- [x] BeadDetail 支持展示图片上传按钮和配件详情
- [x] BraceletCanvas 支持鼠标拖拽移动珠子/配件，松开后位置正确更新
- [x] BraceletCanvas 点击空白处可插入当前选中的珠子/配件
- [x] BraceletPreview 能正确渲染图片元素
- [x] Studio 页面有选中项状态指示器
- [x] 保存到 LocalStorage 的设计包含图片 data URL（base64）
- [x] `npm run check` 通过，无类型错误
- [x] 移动端触摸事件也能进行拖拽排序