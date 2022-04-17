import { coinFlip } from "./coinFlip";
import { Cell, CellType } from "../types";
import { directions } from "../constants";

export function generateBoard(colSize: number, rowSize: number): Cell[][] {
  const initState: Cell[][] = [];
  for (let col = 0; col < colSize; col++) {
    for (let row = 0; row < rowSize; row++) {
      const isBomb = coinFlip(15);
      if (!initState[col]) initState[col] = [];
      initState[col][row] = {
        type: isBomb ? CellType.Bomb : CellType.Empty,
        visible: false,
        rowPos: row,
        colPos: col,
        flagged: false,
        adjacentBombsCount:
          (initState[col] && initState[col][row]?.adjacentBombsCount) || 0
      };
      if (isBomb) {
        directions.forEach(([dirX, dirY]) => {
          const [x, y] = [dirX + col, dirY + row];
          if (x >= colSize || y >= rowSize) return;
          if (initState[x] && initState[x][y]) {
            initState[x][y].adjacentBombsCount++;
            return;
          }
          if (!initState[x]) initState[x] = [];
          initState[x][y] = {
            // only for non-created cells, should be always overwritten
            type: CellType.Empty,
            visible: false,
            adjacentBombsCount: 1,
            rowPos: 0,
            colPos: 0,
            flagged: false
          };
        });
      }
    }
  }

  return initState;
}
