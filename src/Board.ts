import { Cell, OP_SYMBOLS, Op } from "./Cell";


type Coords = {
    x: number;
    y: number;
};

export type Board = Map<string, Cell>;

function convertToMapBoard(oldBoard: Array<Array<Cell>>): Board {
    const newBoard: Board = new Map();

    oldBoard.forEach((row, y) => {
        row.forEach((cell, x) => {
            const key = `${x},${y}`;
            if (cell.value !== Op.Empty) {
                newBoard.set(key, cell);
            }
        });
    });

    return newBoard;
}

export function getBoardSize(board: Board) : [number, number, number, number] {
    if (board.size === 0) return [0, 0, 0, 0];

    // Find the dimensions of the board
    let maxX = -Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    for (const key of board.keys()) {
        const [x, y] = key.split(',').map(Number);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
    }
    return [maxX - minX + 1, maxY - minY + 1, minX, minY]
}

export function convertToArrayBoard(board: Board): Array<Array<Cell>> {
    if (board.size === 0) return [];

    const [width, height, left, top] = getBoardSize(board);

    // Create a 2D array filled with empty cells
    const arrayBoard: Array<Array<Cell>> = Array(height).fill(null)
        .map(() => Array(width).fill(null)
            .map(() => new Cell(Op.Empty)));

    // Fill in the non-empty cells
    for (const [key, cell] of board) {
        const [x, y] = key.split(',').map(Number);
        arrayBoard[y-top][x-left] = cell;
    }

    return arrayBoard;
}

export function getCell(board: Board, coords: Coords): Cell | undefined {
    return board.get(`${coords.x},${coords.y}`);
}

export function setCell(board: Board, coords: Coords, cell: Cell): void {
    board.set(`${coords.x},${coords.y}`, cell);
}

export function hasCell(board: Board, coords: Coords): boolean {
    return board.has(`${coords.x},${coords.y}`);
}

export function parse(s: string): Board {
    const board: Board = new Map();
    s.replace(/^solve.*?\n/i, '').split('\n').forEach((row, y) => {
        row.trim().split(/\s+/).forEach((c, x) => {
            if (c !== '.' && c !== '') {
                board.set(`${x},${y}`, new Cell(OP_SYMBOLS.has(c) ? (c as Op) : BigInt(c)));
            }
        });
    });

    return board;
}

/** Encode a board into the ICFP format. */
export function encode(board: Board): string {
    if (board.size === 0) return '.';

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const key of board.keys()) {
        const [x, y] = key.split(',').map(Number);
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }

    const result: string[] = [];
    for (let y = minY; y <= maxY; y++) {
        const row: string[] = [];
        for (let x = minX; x <= maxX; x++) {
            const cell = board.get(`${x},${y}`);
            row.push(cell ? cell.value === Op.Empty ? '.' : cell.toString() : '.');
        }
        while (row.length > 0 && row[row.length - 1] === '.') row.pop();
        result.push(row.length > 0 ? row.join(' ') : '.');
    }

    while (result.length > 0 && result[result.length - 1] === '.') result.pop();
    
    return result.join('\n') || '.';
}

export function eq(b1: Board, b2: Board): boolean {
    if (b1.size !== b2.size) return false;
    for (const key of b1.keys()) {
        if (!b2.has(key)) return false;
        if (b1.get(key)?.value !== b2.get(key)?.value) return false;
    }
    return true;
}
