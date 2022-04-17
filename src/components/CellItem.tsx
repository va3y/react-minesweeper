import React from "react";
import { CellType, Cell } from "../types";

function getColor(count: number) {
  switch (count) {
    case 1:
      return "text-green-500";
    case 2:
      return "text-red-700";
    case 3:
      return "text-amber-400";
    case 4:
      return "text-teal-500";
    case 5:
      return "text-purple-500";
    case 6:
      return "text-rose-500";
    case 7:
      return "text-lime-500";
    case 8:
      return "text-green-500";
    default:
      return "";
  }
}

export const CellItem: React.FC<
  {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
  } & Cell
> = ({
  type,
  adjacentBombsCount,
  visible,
  onClick,
  onContextMenu,
  flagged
}) => {
  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`font-black cursor-pointer border border-zinc-700 hover:bg-zinc-700 transition ease-in-out duration-200 text-center h-12 flex items-center justify-center ${getColor(
        adjacentBombsCount
      )}/${visible ? "100" : "100"} select-none ${
        visible ? "bg-zinc-600" : ""
      }`}
    >
      {type === CellType.Bomb && visible && "💣"}
      {type === CellType.Empty &&
        visible &&
        adjacentBombsCount !== 0 &&
        adjacentBombsCount}
      {!visible && flagged ? "🏳" : ""}
    </div>
  );
};
