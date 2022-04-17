import * as React from "react";
import { ActionTypes, Cell, CellType, GameStateAction } from "../types";
import { CellItem } from "./CellItem";
import { generateBoard } from "../utils/generateBoard";
import { traverseBoardOnClick } from "../utils/traverseBoardOnClick";
import { isWinCondition } from "../utils/isWinCondition";

export const MineSweeper: React.FC<{ colSize: number; rowSize: number }> = ({
  colSize,
  rowSize
}) => {
  const [cells, dispatch] = React.useReducer(
    (prevState: Cell[][], { type, payload }: GameStateAction) => {
      if (type === ActionTypes.ResetBoard) {
        return generateBoard(colSize, rowSize);
      }

      if (!payload?.cell) throw new Error("payload needed for this action");

      if (type === ActionTypes.FlagCell && !payload.cell.visible) {
        const { colPos, rowPos } = payload.cell;
        prevState[colPos][rowPos].flagged = !prevState[colPos][rowPos].flagged;
        return [...prevState];
      }

      if (type === ActionTypes.CellClick) {
        if (payload.cell.type === CellType.Bomb) {
          window.alert("You lost :(");
          return generateBoard(colSize, rowSize);
        }

        const { colPos, rowPos } = payload.cell;

        const traersed = [
          ...traverseBoardOnClick(prevState, {
            clickRow: rowPos,
            clickCol: colPos
          })
        ];

        traersed[colPos][rowPos].visible = true;

        if (isWinCondition(traersed)) {
          window.alert("you won!");
          return generateBoard(colSize, rowSize);
        }

        return traersed;
      }

      return prevState;
    },
    []
  );

  React.useEffect(() => {
    dispatch({ type: ActionTypes.ResetBoard });
  }, []);

  return (
    <>
      <div
        className="grid max-w-lg mx-auto my-4  bg-zinc-800 border border-zinc-700"
        style={{
          gridTemplateColumns: `repeat(${colSize}, minmax(0, 1fr))`
        }}
      >
        {cells.map((row) =>
          row.map((cell) => {
            return (
              <CellItem
                {...cell}
                onClick={(e) =>
                  dispatch({
                    type: ActionTypes.CellClick,
                    payload: {
                      cell
                    }
                  })
                }
                onContextMenu={(e) => {
                  e.preventDefault();
                  dispatch({
                    type: ActionTypes.FlagCell,
                    payload: {
                      cell
                    }
                  });
                }}
              />
            );
          })
        )}
      </div>
      <button
        className="mt-4 bg-zinc-300 mx-auto py-2 px-4 block rounded-sm"
        onClick={() => dispatch({ type: ActionTypes.ResetBoard })}
      >
        Restart
      </button>
    </>
  );
};
