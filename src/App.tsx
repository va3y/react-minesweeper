import * as React from "react";
import "./styles.css";
import { MineSweeper } from "./components/MineSweeper";

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-zinc-400 text-center text-4xl">Minesweeper</h1>
      <MineSweeper colSize={10} rowSize={10} />
    </div>
  );
}
