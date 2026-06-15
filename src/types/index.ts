export interface CrystalBead {
  id: string;
  name: string;
  color: string;
  category: string;
  shape: "round" | "oval" | "square" | "heart";
  size: number;
  meaning: string;
  colorHex: string;
  imageDataUrl?: string;
}

export interface Accessory {
  id: string;
  name: string;
  type: "spacer" | "pendant" | "charm" | "clasp";
  category: string;
  meaning: string;
  colorHex: string;
  imageDataUrl?: string;
}

export interface BraceletDesign {
  id: string;
  name: string;
  items: StudioItem[];
  createdAt: string;
  updatedAt: string;
}

export interface DesignBead {
  kind: "bead";
  id: string;
  beadId: string;
  bead: CrystalBead;
  position: number;
}

export interface DesignAccessory {
  kind: "accessory";
  id: string;
  accessoryId: string;
  accessory: Accessory;
  position: number;
}

export type StudioItem = DesignBead | DesignAccessory;

export type BeadCategory =
  | "all"
  | "紫水晶"
  | "粉晶"
  | "黑曜石"
  | "白水晶"
  | "黄水晶"
  | "绿玛瑙"
  | "蓝晶石";

export type AccessoryCategory = "all" | "金属隔珠" | "吊坠" | "挂饰";
