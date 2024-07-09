import { Board, getCell, hasCell } from "./Board";
import { Cell, Op } from "./Cell";

export namespace Eval {


/** Fill in the initial values of A/B. */
export function initialize(board: Board, a: number, b: number): Board {
    let inited: Board = new Map<string, Cell>();
    for (const key of board.keys()) {
        const val = board.get(key)?.value;
        if (val === Op.A) {
            inited.set(key, new Cell(BigInt(a)));
        } else if (val === Op.B) {
            inited.set(key, new Cell(BigInt(b)));
        } else {
            inited.set(key, new Cell(val));
        }
    }

    return inited;
}

/*
  = ConflictingWarps [Warp]
  | TooManySubmits [Value]
  | WarpToInvalidDt Int
  | WarpToConflictingTimes [Time]
  | WarpDtMustBePositive Int
  | NoChange  -- without submitting a value
  | TickLimitExceeded
  | BoardError BoardError

*/

/** One step of evaluation. */
export function step(t: number, history: Array<[Board, bigint | undefined]>): [Board, bigint | undefined] {
    let board = history[t][0];
    let solution: bigint | undefined;
    // dirty flag for src board means this cell was already processed
    // dirty for out board means write to this cell is happened as a result of Op application
    let out = new Map(); // create an empty output Board
    for (const key of board.keys()) {
        board.set(key, new Cell(board.get(key)?.value)); // clear dirty flags in src board
    }

    function write(x: number, y: number, cell: Cell) {
        const key = `${x},${y}`;
        // It is an error to submit multiple different values, submitting the same value simultaneously multiple times is fine.
        if (board.get(key)?.value === Op.Solve) {
            let cValue = cell.value;
            if (typeof cValue === 'bigint') {
                if (solution !== undefined && solution !== cValue) {
                    throw new Error(`TooManySubmits`)
                }
                solution = cValue;
            }
        }
        if (out.get(key)?.dirty) {
            throw new Error(`multiple writes to ${key}`)
        }
        out.set(key, new Cell(cell.value, true));
    }

    function writeWarp(x: number, y: number, cell: Cell) {
        const key = `${x},${y}`;
        // It is an error to submit multiple different values, submitting the same value simultaneously multiple times is fine.
        let cValue = cell.value;
        if (out.get(key)?.value === Op.Solve) {
            if (typeof cValue === 'bigint') {
                if (solution !== undefined && solution !== cValue) {
                    throw new Error(`TooManySubmits`)
                }
                solution = cValue;
            }
        }
        out.set(key, new Cell(cValue, true));
    }

    //            arrowCoords           direction
    function move(x: number, y: number, dx: number, dy: number) {
        const sx = x - dx; // source cell to move
        const sy = y - dy;
        dx = x + dx; // destination coords
        dy = y + dy;
        if (hasCell(board, {x: sx, y: sy})) {
            const cell = getCell(board, {x: sx, y: sy})!;
            board.set(`${sx},${sy}`, new Cell(cell.value, true)); // mark src cell dirty, but keep value for possible another ops
            write(dx, dy, cell);
        }
    }

    function mathOp(x: number, y: number, f: (l: bigint, u: bigint) => bigint | undefined): void {
        const left = getCell(board, {x: x-1, y: y});
        const top = getCell(board, {x: x, y: y-1});
        if (typeof left?.value !== 'bigint') return;
        if (typeof top?.value !== 'bigint') return;
        const l = left.value as bigint;
        const u = top.value as bigint;
        board.set(`${x-1},${y}`, new Cell(l, true));
        board.set(`${x},${y-1}`, new Cell(u, true));
        const cell = f(l, u);
        if (cell === undefined) return;
        const opResult = new Cell(cell, true);
        write(x, y + 1, opResult);
        write(x + 1, y, opResult);
    }

    function divOp(x: number, y: number, f: (l: bigint, u: bigint) => bigint | undefined): void {
        const left = getCell(board, {x: x-1, y: y});
        const top = getCell(board, {x: x, y: y-1});
        if (typeof left?.value !== 'bigint') return;
        if (typeof top?.value !== 'bigint') return;
        const l = left.value as bigint;
        const u = top.value as bigint;
        if (u == 0n) return; // div by 0 should not reduce
        board.set(`${x-1},${y}`, new Cell(l, true));
        board.set(`${x},${y-1}`, new Cell(u, true));
        const cell = f(l, u);
        if (cell === undefined) return;
        const opResult = new Cell(cell, true);
        write(x, y + 1, opResult);
        write(x + 1, y, opResult);
    }

    function eq(x: number, y: number, eq: boolean): void {
        const l = getCell(board, {x: x-1, y: y})?.value;
        const u = getCell(board, {x: x, y: y-1})?.value;
        if (l === undefined || u === undefined) return;
        if (eq) {
            if (l !== u) return;
        } else {
            if (l === u) return;
        }
        board.set(`${x-1},${y}`, new Cell(l, true));
        board.set(`${x},${y-1}`, new Cell(u, true));
        write(x, y + 1, new Cell(l, true));
        write(x + 1, y, new Cell(u, true));
    }

    const warps: { x: number, y: number, v: Op | bigint, dt: number }[] = [];

    //                coords of @
    function saveWarp(x: number, y: number): void {
        /*
            .  v  .
            dx @ dy
            .  dt .
        */
        const dx = board.get(`${x-1},${y}`)?.value;
        if (typeof dx !== 'bigint') return;
        const dy = board.get(`${x+1},${y}`)?.value;
        if (typeof dy !== 'bigint') return;
        const v = board.get(`${x},${y-1}`)?.value;
        if (v === undefined || v === Op.Empty) return;
        const dt = board.get(`${x},${y+1}`)?.value;
        if (typeof dt !== 'bigint') return;
        // consume all 4 vals
        board.set(`${x-1},${y}`, new Cell(dx, true));
        board.set(`${x+1},${y}`, new Cell(dy, true));
        board.set(`${x},${y-1}`, new Cell(v, true));
        board.set(`${x},${y+1}`, new Cell(dt, true));

        warps.push({ x: x - Number(dx), y: y - Number(dy), v: v, dt: Number(dt) });
    }

    for (const key of board.keys()) {
        const [x, y] = key.split(',').map(Number);
        const cell = board.get(key)!;
        switch (cell.value) {
            case Op.Empty: break; // should not happen
            case Op.A: break; // should not happen
            case Op.B: break; // should not happen

            case Op.Up: move(x, y, 0, -1); break;
            case Op.Down: move(x, y, 0, 1); break;
            case Op.Left: move(x, y, -1, 0); break;
            case Op.Right: move(x, y, 1, 0); break;

            case Op.Add: mathOp(x, y, (l, u) => l + u); break;
            case Op.Sub: mathOp(x, y, (l, u) => l - u); break;
            case Op.Mul: mathOp(x, y, (l, u) => l * u); break;
            case Op.Div: divOp(x, y, (l, u) => l / u); break;
            case Op.Mod: divOp(x, y, (l, u) => l % u); break;

            case Op.Eq: eq(x, y, true); break;
            case Op.NEq: eq(x, y, false); break;

            case Op.Solve: break; // ignore, saving the result is being checked inside of write()

            case Op.Warp: saveWarp(x, y); break;

            default:
                if (typeof cell.value === 'bigint') break; // ignore bigints for now, will copy on the next pass
                throw new Error(`unhandled op: ${cell}`);
        }
    }

    // copy src operators, not marked as dirty, to dst board
    for (const key of board.keys()) {
        const cell = board.get(key)!;
        if (cell.dirty) continue;
        const val = cell.value;
        switch (val) {
            case Op.Up:
            case Op.Down:
            case Op.Left:
            case Op.Right:
            case Op.Add:
            case Op.Sub:
            case Op.Mul:
            case Op.Div:
            case Op.Mod:
            case Op.Eq:
            case Op.NEq:
            case Op.Solve:
            case Op.Warp:
                out.set(key, new Cell(val)); break;

            default:
                if (typeof val === 'bigint') {
                    out.set(key, new Cell(val)); 
                    break;
                }
                throw new Error(`unexpected op: ${cell}`);
        }
    }

/*
    If two different warp operators attempt to write different values 
    into the same destination cell at the same destination time, the simulation will crash.
    Writing the same value into the same cell is fine, 
    as is writing different values into different cells.
*/
    if (warps.length > 0) {
        let dt = warps[0].dt;
        let x = warps[0].x;
        let y = warps[0].y;
        let v = warps[0].v;
        if (dt < 1) {
            throw new Error('invalid dt');
        }
        if (warps.some(w => w.dt !== dt)) {
            throw new Error('time travels must all have the same dt');
        }
        if (warps.some(w => w.x === x && w.y === y && w.v !== v)) {
            throw new Error('ConflictingWarps');
        }
        for (let i = 0; i <= dt; i++) {
            out = history.pop()![0]; // drop boards until target time (inclusive)
        }
        for (let { x, y, v } of warps) {
            writeWarp(x, y, new Cell(v)); // modify out board
        }
        history.push([out, undefined]);
    }

    return [out, solution];
}

}