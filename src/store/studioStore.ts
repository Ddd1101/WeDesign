import { create } from "zustand";
import type {
  CrystalBead,
  Accessory,
  BraceletDesign,
  DesignBead,
  DesignAccessory,
  StudioItem,
} from "@/types";
import { beadLibrary } from "@/data/beads";
import { accessoryLibrary } from "@/data/accessories";

const STORAGE_KEY = "bracelet_designs";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadSavedDesigns(): BraceletDesign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const designs: BraceletDesign[] = JSON.parse(raw);
    // 迁移旧格式：如果没有 items 字段，用 beads 字段
    return designs.map((d) => {
      const raw = d as unknown as Record<string, unknown>;
      if (!d.items && raw.beads) {
        const oldBeads = raw.beads as DesignBead[];
        return {
          ...d,
          items: oldBeads.map((b) => ({ ...b, kind: "bead" as const })),
        };
      }
      return d;
    });
  } catch {
    return [];
  }
}

function persistDesigns(designs: BraceletDesign[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
}

interface StudioState {
  beadLibrary: CrystalBead[];
  accessoryLibrary: Accessory[];
  currentItems: StudioItem[];
  history: StudioItem[][];
  historyIndex: number;
  savedDesigns: BraceletDesign[];
  selectedItem: CrystalBead | Accessory | null;
  wristSize: number;
  beadSize: number;

  setWristSize: (size: number) => void;
  setBeadSize: (size: number) => void;
  addBead: (bead: CrystalBead) => void;
  addAccessory: (accessory: Accessory) => void;
  addCustomBead: (
    name: string,
    imageDataUrl: string,
    category: string,
  ) => CrystalBead;
  addCustomAccessory: (
    name: string,
    imageDataUrl: string,
    category: string,
  ) => Accessory;
  updateBeadImage: (beadId: string, imageDataUrl: string) => void;
  updateAccessoryImage: (accessoryId: string, imageDataUrl: string) => void;
  removeItem: (index: number) => void;
  moveItem: (from: number, to: number) => void;
  insertItemAt: (position: number) => void;
  undo: () => void;
  redo: () => void;
  clearAll: () => void;
  saveDesign: (name: string) => BraceletDesign;
  loadDesign: (design: BraceletDesign) => void;
  deleteDesign: (id: string) => void;
  setSelectedItem: (item: CrystalBead | Accessory | null) => void;
}

function pushHistory(
  set: (fn: (state: StudioState) => Partial<StudioState>) => void,
  get: () => StudioState,
  newItems: StudioItem[],
) {
  const { history, historyIndex } = get();
  const newHistory = history.slice(0, historyIndex + 1);
  newHistory.push(newItems);
  return { history: newHistory, historyIndex: newHistory.length - 1 };
}

export const useStudioStore = create<StudioState>((set, get) => ({
  beadLibrary,
  accessoryLibrary,
  currentItems: [],
  history: [[]],
  historyIndex: 0,
  savedDesigns: loadSavedDesigns(),
  selectedItem: null,
  wristSize: 160,
  beadSize: 8,

  setWristSize: (size: number) => set({ wristSize: size }),
  setBeadSize: (size: number) => set({ beadSize: size }),

  addBead: (bead: CrystalBead) => {
    const { currentItems } = get();
    const item: DesignBead = {
      kind: "bead",
      id: generateId(),
      beadId: bead.id,
      bead: { ...bead },
      position: currentItems.length,
    };
    const newItems = [...currentItems, item];
    set({ currentItems: newItems, ...pushHistory(set, get, newItems) });
  },

  addAccessory: (accessory: Accessory) => {
    const { currentItems } = get();
    const item: DesignAccessory = {
      kind: "accessory",
      id: generateId(),
      accessoryId: accessory.id,
      accessory: { ...accessory },
      position: currentItems.length,
    };
    const newItems = [...currentItems, item];
    set({ currentItems: newItems, ...pushHistory(set, get, newItems) });
  },

  addCustomBead: (name: string, imageDataUrl: string, category: string) => {
    const newBead: CrystalBead = {
      id: `custom-bead-${generateId()}`,
      name,
      color: "自定义",
      category,
      shape: "round",
      size: 8,
      meaning: "自定义水晶珠子",
      colorHex: "#888",
      imageDataUrl,
    };
    set((s) => ({ beadLibrary: [...s.beadLibrary, newBead] }));
    return newBead;
  },

  addCustomAccessory: (
    name: string,
    imageDataUrl: string,
    category: string,
  ) => {
    const newAcc: Accessory = {
      id: `custom-acc-${generateId()}`,
      name,
      type: "charm",
      category,
      meaning: "自定义配件",
      colorHex: "#888",
      imageDataUrl,
    };
    set((s) => ({ accessoryLibrary: [...s.accessoryLibrary, newAcc] }));
    return newAcc;
  },

  updateBeadImage: (beadId: string, imageDataUrl: string) => {
    set((s) => ({
      beadLibrary: s.beadLibrary.map((b) =>
        b.id === beadId ? { ...b, imageDataUrl } : b,
      ),
    }));
  },

  updateAccessoryImage: (accessoryId: string, imageDataUrl: string) => {
    set((s) => ({
      accessoryLibrary: s.accessoryLibrary.map((a) =>
        a.id === accessoryId ? { ...a, imageDataUrl } : a,
      ),
    }));
  },

  removeItem: (index: number) => {
    const { currentItems } = get();
    const newItems = currentItems
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, position: i }));
    set({ currentItems: newItems, ...pushHistory(set, get, newItems) });
  },

  moveItem: (from: number, to: number) => {
    const { currentItems } = get();
    const newItems = [...currentItems];
    const [moved] = newItems.splice(from, 1);
    newItems.splice(to, 0, moved);
    const reordered = newItems.map((item, i) => ({ ...item, position: i }));
    set({ currentItems: reordered, ...pushHistory(set, get, reordered) });
  },

  insertItemAt: (position: number) => {
    const { selectedItem, currentItems } = get();
    if (!selectedItem) return;

    let newItem: StudioItem;
    if ("shape" in selectedItem) {
      newItem = {
        kind: "bead",
        id: generateId(),
        beadId: selectedItem.id,
        bead: { ...selectedItem },
        position,
      };
    } else {
      newItem = {
        kind: "accessory",
        id: generateId(),
        accessoryId: selectedItem.id,
        accessory: { ...selectedItem },
        position,
      };
    }

    const newItems = [...currentItems];
    newItems.splice(position, 0, newItem);
    const reindexed = newItems.map((item, i) => ({ ...item, position: i }));
    set({ currentItems: reindexed, ...pushHistory(set, get, reindexed) });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({ currentItems: [...history[newIndex]], historyIndex: newIndex });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({ currentItems: [...history[newIndex]], historyIndex: newIndex });
    }
  },

  clearAll: () => {
    const newItems: StudioItem[] = [];
    set({ currentItems: newItems, ...pushHistory(set, get, newItems) });
  },

  saveDesign: (name: string) => {
    const { currentItems, savedDesigns, wristSize, beadSize } = get();
    const now = new Date().toISOString();
    const design: BraceletDesign = {
      id: generateId(),
      name,
      items: currentItems,
      wristSize,
      beadSize,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [...savedDesigns, design];
    persistDesigns(updated);
    set({ savedDesigns: updated });
    return design;
  },

  loadDesign: (design: BraceletDesign) => {
    const items = design.items || [];
    const newHistory = [...get().history, [...items]];
    set({
      currentItems: [...items],
      history: newHistory,
      historyIndex: newHistory.length - 1,
      wristSize: design.wristSize ?? 160,
      beadSize: design.beadSize ?? 8,
    });
  },

  deleteDesign: (id: string) => {
    const { savedDesigns } = get();
    const updated = savedDesigns.filter((d) => d.id !== id);
    persistDesigns(updated);
    set({ savedDesigns: updated });
  },

  setSelectedItem: (item: CrystalBead | Accessory | null) => {
    set({ selectedItem: item });
  },
}));
