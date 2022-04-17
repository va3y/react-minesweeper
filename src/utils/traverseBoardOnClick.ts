import { Cell, CellType } from "../types";
import { directions } from "../constants";

type TraverseBoardOnClick = (
  board: Cell[][],
  { clickRow, clickCol }: { clickRow: number; clickCol: number }
) => Cell[][];

export const traverseBoardOnClick: TraverseBoardOnClick = (
  board,
  { clickRow, clickCol }
) => {
  if (
    !board[clickCol] ||
    !board[clickCol][clickRow] ||
    board[clickCol][clickRow].visible ||
    board[clickCol][clickRow].type === CellType.Bomb
  )
    return board;

  board[clickCol][clickRow].visible = true;

  if (board[clickCol][clickRow].adjacentBombsCount !== 0) return board;

  directions.forEach(([dirX, dirY]) => {
    const [x, y] = [clickCol + dirX, clickRow + dirY];
    traverseBoardOnClick(board, {
      clickCol: x,
      clickRow: y
    });
  });

  return board;
};
