import { Cell, CellType } from "../types";

export const isWinCondition = (board: Cell[][]): boolean => {
  for (const col of board) {
    for (const cell of col) {
      if (!cell.visible && cell.type !== CellType.Bomb) return false;
    }
  }

  return true;
};
