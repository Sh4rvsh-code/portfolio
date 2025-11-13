import React, { useMemo, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export const BackgroundRippleEffect = ({
  rows = 15,
  cols = 40,
  cellSize = 80
}) => {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full z-[1]",
        "[--cell-border-color:rgba(60,60,60,0.3)] [--cell-fill-color:rgba(0,0,0,0.9)] [--cell-shadow-color:rgba(255,255,255,0.15)]"
      )}
    >
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <DivGrid
          key={`base-${rippleKey}`}
          className="opacity-100"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};

const DivGrid = ({
  className,
  rows = 15,
  cols = 40,
  cellSize = 80,
  borderColor = "rgba(40,40,40,0.5)",
  fillColor = "rgba(0,0,0,0.8)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true
}) => {
  const cells = useMemo(() => Array.from({ length: rows * cols }, (_, idx) => idx), [rows, cols]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0,
  };

  return (
    <div className={cn("relative", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 40) : 0; // ms
        const duration = 300 + distance * 100; // ms

        const style = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-50 transition-all duration-200 will-change-transform hover:opacity-80 hover:bg-gray-900/90",
              "shadow-[0px_0px_20px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:forwards]",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
