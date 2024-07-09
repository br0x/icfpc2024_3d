import { useRef, useEffect, useState } from 'preact/hooks';
import { Board, getBoardSize } from './Board';
import { CANVAS_MAX_SIZE } from './app';

interface HoveredCanvasProps {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
  getCellContent: (x: number, y: number) => string | undefined;
  step: [Board, bigint | undefined];
}

export function HoveredCanvas({ width, height, draw, getCellContent, step }: HoveredCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredContent, setHoveredContent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    draw(ctx);
  }, [draw, step]);

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const [w, h, left, top] = getBoardSize(step[0]);
    const biggest = Math.max(w, h);
    const CELL_SIZE = Math.floor(CANVAS_MAX_SIZE / biggest);
    const top_offset = Math.floor((CANVAS_MAX_SIZE - h * CELL_SIZE) / 2);
    const left_offset = Math.floor((CANVAS_MAX_SIZE - w * CELL_SIZE) / 2);


    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cellX = Math.floor((x-left_offset) / CELL_SIZE) + left;
    const cellY = Math.floor((y-top_offset) / CELL_SIZE) + top;
    if (left <= cellX && cellX < left + w && top <= cellY && cellY < h) {
      const content = getCellContent(cellX, cellY);
      setHoveredContent(content || null);
    }
    setMousePosition({ x: x, y: y });
  };

  const handleMouseLeave = () => {
    setHoveredContent(null);
    setMousePosition(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {hoveredContent && mousePosition && (
        <div
          style={{
            position: 'absolute',
            left: `${mousePosition.x + 10}px`,
            top: `${mousePosition.y + 10}px`,
            background: 'white',
            border: '1px solid black',
            padding: '2px',
            zIndex: 1000,
          }}
        >
          {hoveredContent}
        </div>
      )}
    </div>
  );
}