## 1. 架构设计

```mermaid
flowchart TB
    subgraph 前端层
        A["React 18 + TypeScript"]
        B["React Router 路由管理"]
        C["Zustand 状态管理"]
    end
    subgraph 数据层
        D["LocalStorage 本地持久化"]
        E["内存状态 Store"]
    end
    subgraph 样式层
        F["Tailwind CSS + 自定义主题"]
        G["CSS 动画/过渡"]
    end
    A --> B
    A --> C
    C --> D
    C --> E
    A --> F
    A --> G
```

## 2. 技术选型

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：Tailwind CSS 3 + 自定义 CSS 变量
- **状态管理**：Zustand
- **路由**：React Router v6
- **图标**：Lucide React
- **后端**：无（纯前端应用，使用 LocalStorage 持久化）
- **项目模板**：react-ts

## 3. 路由定义

| 路由 | 页面组件 | 用途 |
|------|----------|------|
| `/` | `Home` | 首页，品牌展示和热门设计 |
| `/studio` | `Studio` | 设计工坊，核心 DIY 编辑页 |
| `/gallery` | `Gallery` | 作品画廊，展示已保存设计 |

## 4. API 定义

本项目为纯前端应用，无后端 API。数据通过 Zustand Store 管理，持久化至 LocalStorage。

## 5. 数据模型

### 5.1 数据模型定义

```mermaid
erDiagram
    CrystalBead {
        string id PK "珠子唯一ID"
        string name "珠子名称"
        string color "颜色"
        string category "分类（紫水晶/粉晶/黑曜石等）"
        string shape "形状（圆形/椭圆形/方形）"
        number size "尺寸（mm）"
        string meaning "寓意描述"
        string imageUrl "珠子图片URL"
    }
    BraceletDesign {
        string id PK "设计ID"
        string name "设计名称"
        string createdAt "创建时间"
        string updatedAt "更新时间"
    }
    DesignBead {
        string id PK "设计珠子ID"
        string designId FK "关联设计ID"
        string beadId FK "关联珠子ID"
        number position "在手链中的位置（0-N）"
    }
    CrystalBead ||--o{ DesignBead : "被使用"
    BraceletDesign ||--o{ DesignBead : "包含"
```

### 5.2 TypeScript 类型定义

```typescript
// 水晶珠子
interface CrystalBead {
  id: string;
  name: string;
  color: string;
  category: string;
  shape: 'round' | 'oval' | 'square' | 'heart';
  size: number; // mm
  meaning: string;
  colorHex: string; // 用于渲染颜色
}

// 手链设计
interface BraceletDesign {
  id: string;
  name: string;
  beads: DesignBead[];
  createdAt: string;
  updatedAt: string;
}

// 设计中的珠子（带位置）
interface DesignBead {
  id: string;
  beadId: string;
  bead: CrystalBead;
  position: number;
}

// Zustand Store
interface StudioStore {
  // 当前编辑的设计
  currentDesign: BraceletDesign;
  // 珠子库
  beadLibrary: CrystalBead[];
  // 历史记录（用于撤销/重做）
  history: DesignBead[][];
  historyIndex: number;
  // 操作
  addBead: (bead: CrystalBead) => void;
  removeBead: (position: number) => void;
  reorderBeads: (from: number, to: number) => void;
  undo: () => void;
  redo: () => void;
  clearDesign: () => void;
  saveDesign: (name: string) => void;
  loadDesign: (designId: string) => void;
  // 画廊
  savedDesigns: BraceletDesign[];
  getSavedDesigns: () => BraceletDesign[];
  deleteDesign: (designId: string) => void;
}
```

## 6. 组件树

```
App
├── Layout
│   └── Navbar
├── Home (首页)
│   ├── Hero
│   └── FeaturedDesigns
│       └── DesignCard[]
├── Studio (设计工坊)
│   ├── BeadPanel (珠子面板)
│   │   ├── CategoryFilter
│   │   └── BeadGrid
│   │       └── BeadItem[]
│   ├── BraceletCanvas (手链画布)
│   │   └── BeadOnBracelet[]
│   ├── Toolbar (工具栏)
│   └── BeadDetail (珠子详情弹窗)
└── Gallery (作品画廊)
    └── DesignCard[]
```