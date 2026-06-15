export interface CrystalBead {
  id: string;
  name: string;
  color: string;
  category: string;
  shape: "round" | "oval" | "square" | "heart";
  size: number;
  meaning: string;
  colorHex: string;
}

export interface BraceletDesign {
  id: string;
  name: string;
  beads: DesignBead[];
  createdAt: string;
  updatedAt: string;
}

export interface DesignBead {
  id: string;
  beadId: string;
  bead: CrystalBead;
  position: number;
}

export type BeadCategory =
  | "all"
  | "紫水晶"
  | "粉晶"
  | "黑曜石"
  | "白水晶"
  | "黄水晶"
  | "绿玛瑙"
  | "蓝晶石";
