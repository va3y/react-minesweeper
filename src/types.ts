export enum CellType {
  Bomb,
  Empty
}

export interface Cell {
  type: CellType;
  visible: boolean;
  flagged: boolean;
  adjacentBombsCount: number;
  rowPos: number;
  colPos: number;
}

export enum ActionTypes {
  CellClick,
  ResetBoard,
  FlagCell
}

export interface GameStateAction {
  type: ActionTypes;
  payload?: {
    cell: Cell;
  };
}
