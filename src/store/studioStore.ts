import { create } from "zustand";
import type { CrystalBead, BraceletDesign, DesignBead } from "@/types";
import { beadLibrary } from "@/data/beads";

const STORAGE_KEY = "bracelet_designs";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadSavedDesigns(): BraceletDesign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistDesigns(designs: BraceletDesign[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
}

interface StudioState {
  // 珠子库
  beadLibrary: CrystalBead[];
  // 当前编辑的设计手链
  currentBeads: DesignBead[];
  // 历史记录（用于撤销/重做）
  history: DesignBead[][];
  historyIndex: number;
  // 已保存的设计
  savedDesigns: BraceletDesign[];
  // 当前选中珠子
  selectedBead: CrystalBead | null;

  // 操作
  addBead: (bead: CrystalBead) => void;
  removeBead: (index: number) => void;
  reorderBeads: (from: number, to: number) => void;
  undo: () => void;
  redo: () => void;
  clearAll: () => void;
  saveDesign: (name: string) => BraceletDesign;
  loadDesign: (design: BraceletDesign) => void;
  deleteDesign: (id: string) => void;
  setSelectedBead: (bead: CrystalBead | null) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  beadLibrary,
  currentBeads: [],
  history: [[]],
  historyIndex: 0,
  savedDesigns: loadSavedDesigns(),
  selectedBead: null,

  addBead: (bead: CrystalBead) => {
    const { currentBeads, history, historyIndex } = get();
    const newBead: DesignBead = {
      id: generateId(),
      beadId: bead.id,
      bead,
      position: currentBeads.length,
    };
    const newBeads = [...currentBeads, newBead];
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBeads);
    set({
      currentBeads: newBeads,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  removeBead: (index: number) => {
    const { currentBeads, history, historyIndex } = get();
    const newBeads = currentBeads
      .filter((_, i) => i !== index)
      .map((b, i) => ({ ...b, position: i }));
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBeads);
    set({
      currentBeads: newBeads,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  reorderBeads: (from: number, to: number) => {
    const { currentBeads, history, historyIndex } = get();
    const newBeads = [...currentBeads];
    const [moved] = newBeads.splice(from, 1);
    newBeads.splice(to, 0, moved);
    const reordered = newBeads.map((b, i) => ({ ...b, position: i }));
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(reordered);
    set({
      currentBeads: reordered,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        currentBeads: [...history[newIndex]],
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        currentBeads: [...history[newIndex]],
        historyIndex: newIndex,
      });
    }
  },

  clearAll: () => {
    const { history } = get();
    const newHistory = [...history, []];
    set({
      currentBeads: [],
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  saveDesign: (name: string) => {
    const { currentBeads, savedDesigns } = get();
    const now = new Date().toISOString();
    const design: BraceletDesign = {
      id: generateId(),
      name,
      beads: currentBeads,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [...savedDesigns, design];
    persistDesigns(updated);
    set({ savedDesigns: updated });
    return design;
  },

  loadDesign: (design: BraceletDesign) => {
    const { history } = get();
    const newHistory = [...history, [...design.beads]];
    set({
      currentBeads: [...design.beads],
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  deleteDesign: (id: string) => {
    const { savedDesigns } = get();
    const updated = savedDesigns.filter((d) => d.id !== id);
    persistDesigns(updated);
    set({ savedDesigns: updated });
  },

  setSelectedBead: (bead: CrystalBead | null) => {
    set({ selectedBead: bead });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}));
