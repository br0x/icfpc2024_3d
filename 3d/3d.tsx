import * as preact from 'preact';
import { useState } from 'preact/hooks';

/** The types of operations a cell can contain. */
enum Op {
    Empty = ' ',
    Left = '<',
    Right = '>',
    Up = '^',
    Down = 'v',
    Add = '+',
    Sub = '-',
    Mul = '*',
    Div = '/',
    Mod = '%',
    TimeTravel = '@',
    Eq = '=',
    NEq = '#',
    Solve = 'S',
    A = 'A',
    B = 'B',
}
const OP_SYMBOLS = new Set(Object.values(Op) as string[]);

/** Cells contain either an operation or a value. */
type Cell = Op | number;

type Board = Array<Array<Cell>>;

namespace Board {
    export function parse(s: string): Board {
        let board = s.split('\n').map(row =>
            row.split(/\s+/).map(c => {
                if (OP_SYMBOLS.has(c)) return c as Op;
                if (c === '.' || c === '') return Op.Empty;
                const num = parseInt(c, 10);
                if (!isNaN(num)) return num;
                throw new Error('invalid cell: ' + c);
            }));
        board = trim(board);
        board = ensure(board, 0, 0);  // fill empty rows
        return board;
    }

    /** Ensure board is large enough for (x,y) and all cells are present. */
    export function ensure(board: Board, x: number, y: number): Board {
        x = board.reduce((max, row) => Math.max(max, row.length - 1), x);

        board = board.map(row => row.slice());
        while (board.length < y + 1) {
            board.push([]);
        }
        for (const row of board) {
            while (row.length < x + 1) row.push(Op.Empty);
        }
        return board;
    }

    /** A 'trimmed' board has no trailing empty cells on a row. */
    export function trim(board: Board): Board {
        board = board.map(row => {
            let end = row.length;
            while (end > 0 && row[end - 1] === Op.Empty) end--;
            return row.slice(0, end);
        });
        while (board.length > 0 && board[board.length - 1].length === 0) {
            board.pop();
        }
        return board;
    }

    /** Encode a board into the ICFP format. */
    export function encode(board: Board): string {
        return trim(board).map(row => {
            const line = row.map(c => c === Op.Empty ? '.' : c).join(' ');
            if (line === '') return '.';
            return line;
        }).join('\n');
    }

    export function eq(b1: Board, b2: Board): boolean {
        if (b1.length !== b2.length) return false;
        for (let i = 0; i < b1.length; i++) {
            if (b1[i].length !== b2[i].length) return false;
            for (let j = 0; j < b1[i].length; j++) {
                if (b1[i][j] !== b2[i][j]) return false;
            }
        }
        return true;
    }
}

namespace Eval {
    /** Fill in the initial values of A/B. */
    export function initialize(board: Board, a: number, b: number): Board {
        return board.map(row => row.map(cell => {
            if (cell === Op.A) return a;
            if (cell === Op.B) return b;
            return cell;
        }));
    }

    /** One step of evaluation. */
    export function step(board: Board, history: Board[]): Board | number {
        const writes = new Map<string, Cell>();
        let out = board;  // will be copied before writing

        function write(x: number, y: number, cell: Cell) {
            out = Board.ensure(out, x, y);

            if (y < board.length && x < board[0].length && board[y][x] === Op.Solve) {
                if (typeof cell === 'number') {
                    throw new Error(`solved: ${cell}`);
                }
            }

            out[y][x] = cell;

            // Track writes to catch double writes.
            // Note: we ignore all empty writes because per the rules, they always happen
            // "before".  This might be wrong if we have clears and writes in the same step.
            if (cell === Op.Empty) return;
            const key = `${x},${y}`;
            const prev = writes.get(key);
            if (prev !== undefined) {
                throw new Error(`multiple writes to ${key}: ${prev} / ${cell}`)
            }
            writes.set(key, cell);
        }

        /** Read a cell, clearing it. */
        function consume(x: number, y: number): Cell | undefined {
            const op = board[y][x];
            if (op === Op.Empty) return;
            write(x, y, Op.Empty);
            return op as Op;
        }

        function move(x: number, y: number, dx: number, dy: number) {
            const sx = x - dx;
            const sy = y - dy;
            dx = x + dx;
            dy = y + dy;
            if (sx < 0 || sy < 0) return;
            if (dx < 0 || dy < 0) return;
            if (sx >= board[0].length || sy >= board.length) return;
            const cell = consume(sx, sy);
            if (cell === undefined) return;
            write(dx, dy, cell);
        }

        function mathOp(x: number, y: number, f: (l: number, u: number) => number | undefined): void {
            if (typeof board[y][x - 1] !== 'number') return;
            if (typeof board[y - 1][x] !== 'number') return;
            const l = consume(x - 1, y) as number;
            const u = consume(x, y - 1) as number;
            const cell = f(l, u);
            if (cell === undefined) return;
            write(x, y + 1, cell);
            write(x + 1, y, cell);
        }

        function eq(x: number, y: number, eq: boolean): void {
            const l = board[y][x - 1];
            const u = board[y - 1][x];
            if (l === Op.Empty) return;
            if (u === Op.Empty) return;
            if (eq) {
                if (l !== u) return;
            } else {
                if (l === u) return;
            }
            write(x, y + 1, consume(x - 1, y) as number);
            write(x + 1, y, consume(x, y - 1) as number);
        }

        const timeTravels: { x: number, y: number, v: number, dt: number }[] = [];
        function saveTimeTravel(x: number, y: number): void {
            if (y + 1 >= board.length) return;
            if (x + 1 >= board[0].length) return;
            /*
             .  v  .
            dx  @ dy
             . dt  .
            */
            const dx = board[y][x - 1];
            if (typeof dx !== 'number') return;
            const dy = board[y][x + 1];
            if (typeof dy !== 'number') return;
            const v = board[y - 1][x];
            if (typeof v !== 'number') return;
            const dt = board[y + 1][x];
            if (typeof dt !== 'number') return;

            timeTravels.push({ x: x - dx, y: y - dy, v, dt });
        }

        let solve;
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                const cell = board[y][x];
                switch (cell) {
                    case Op.Empty: break;
                    case Op.A: break;
                    case Op.B: break;

                    case Op.Up: move(x, y, 0, -1); break;
                    case Op.Down: move(x, y, 0, 1); break;
                    case Op.Left: move(x, y, -1, 0); break;
                    case Op.Right: move(x, y, 1, 0); break;

                    case Op.Add: mathOp(x, y, (l, u) => l + u); break;
                    case Op.Sub: mathOp(x, y, (l, u) => l - u); break;
                    case Op.Mul: mathOp(x, y, (l, u) => l * u); break;
                    case Op.Div: mathOp(x, y, (l, u) => Math.trunc(l / u)); break;
                    case Op.Mod: mathOp(x, y, (l, u) => l % u); break;

                    case Op.Eq: eq(x, y, true); break;
                    case Op.NEq: eq(x, y, false); break;

                    case Op.Solve: break;//solve = [x, y]; break;

                    // TODO: buffer up timeTravels so multiple can happen at once
                    case Op.TimeTravel: saveTimeTravel(x, y); break;

                    default:
                        if (typeof cell === 'number') break;
                        throw new Error(`unhandled op: ${cell}`);
                }
            }
        }

        if (timeTravels.length > 0) {
            writes.clear();
            let dt = timeTravels[0].dt;
            if (dt < 1) {
                throw new Error('invalid dt');
            }
            if (timeTravels.some(t => t.dt !== dt)) {
                throw new Error('time travels must all have the same dt');
            }
            history.pop(); // drop board that caused time travel
            for (; dt > 0; --dt) {
                out = history.pop()!;
            }
            out = Board.ensure(out, 0, 0);
            for (let { x, y, v } of timeTravels) {
                write(x, y, v);
            }
        }

        return out;
    }
}

interface GridProps {
    board: Board;
    edit?(x: number, y: number, cell: Cell): void;
}
function Grid(props: GridProps) {
    const { board } = props;

    const tabindex = props.edit ? 0 : undefined;
    const trs = board.map((row, y) => {
        const tds = row.map((cell, x) => {
            const text = cell === ' ' ? '\u00a0' : cell;
            return <td
                data-x={x} data-y={y} tabindex={tabindex}
            >{text}</td>;
        });
        return <tr>{tds}</tr>;
    });

    function onKeyDown(e: KeyboardEvent) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'TD') return;
        e.preventDefault();
        let [x, y] = [parseInt(target.dataset.x!), parseInt(target.dataset.y!)];
        const table = target.parentElement!.parentElement as HTMLTableElement;
        switch (e.key) {
            case 'ArrowUp':
                table.rows[y - 1]?.cells[x]?.focus(); break;
            case 'ArrowDown':
                table.rows[y + 1]?.cells[x]?.focus(); break;
            case 'ArrowLeft':
                table.rows[y]?.cells[x - 1]?.focus(); break;
            case 'ArrowRight':
                table.rows[y]?.cells[x + 1]?.focus(); break;
        }

        if (props.edit) {
            let cell;
            switch (e.key) {
                case 'a': cell = Op.A; break;
                case 'b': cell = Op.B; break;
                case 's': cell = Op.Solve; break;
                case '~': {
                    const n = board[y][x];
                    if (typeof n === 'number') {
                        cell = -n;
                    }
                    break;
                }

                case 'Backspace': cell = Op.Empty; break;
                case 'ArrowDown':
                    if (y === board.length - 1) {
                        cell = Op.Empty;
                        y += 1;
                    }
                    break;
                case 'ArrowRight':
                    if (x === board[0].length - 1) {
                        cell = Op.Empty;
                        x += 1;
                    }
                    break;
                default:
                    if (OP_SYMBOLS.has(e.key)) {
                        cell = e.key as Op;
                    }
                    if (e.key >= '0' && e.key <= '9') {
                        cell = parseInt(e.key);
                    }
            }

            if (cell !== undefined) {
                props.edit(x, y, cell);
            }
        }
    }

    return <table class='grid' onKeyDown={onKeyDown}>{trs}</table>;
}

function App(props: { initial: Board }) {
    let [board, setBoard] = useState(props.initial);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    function setBoardAndURL(board: Board) {
        window.history.replaceState(null, '', '?' + encodeURIComponent(Board.encode(board)));
        setBoard(board);
    }

    function onEdit(x: number, y: number, cell: Cell) {
        board = Board.ensure(board, x, y);
        board[y][x] = cell;
        setBoardAndURL(board);
    }

    function onInput(e: InputEvent, set: (n: number) => void) {
        const value = parseInt((e.target as HTMLInputElement).value, 10);
        if (isNaN(value)) return;
        set(value);
    }

    function onA(e: InputEvent) {
        onInput(e, setA);
    }

    function onB(e: InputEvent) {
        onInput(e, setB);
    }

    let step = Eval.initialize(board, a, b);
    const boards = [];
    const grids = [];
    for (let i = 0; i < 50; i++) {
        boards.push(step);
        grids.push(<div class='grid'>t={boards.length}<br /><Grid board={step} /></div>);
        let next;
        try {
            next = Eval.step(step, boards);
        } catch (e: any) {
            grids.push(<p>Error: {e.message}</p>);
            break;
        }
        if (typeof next === 'number') {
            grids.push(<p>Solved: {next}</p>)
            break;
        }
        if (Board.eq(step, next)) break;
        step = next;
    }

    function onSubmit(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const text = (form.elements.namedItem('text')! as HTMLTextAreaElement).value;
        const board = Board.parse(text);
        setBoardAndURL(board);
    }

    return <>
        <h1>3d</h1>
        <div style={{ display: 'flex' }}>
            <Grid board={board} edit={onEdit} />
            <div style={{ width: '1em' }} />
            <form onSubmit={onSubmit}>
                <textarea name='text' rows={board.length} cols={board[0].length * 2}>{Board.encode(board)}</textarea><br />
                <input type='submit' value='load' />
            </form>
        </div>
        <br />
        <p>
            <label>A: <input size={4} value={a} onInput={onA} /></label>
            {' '}
            <label>B: <input size={4} value={b} onInput={onB} /></label>
        </p>
        {grids}
    </>;;
}

let initialBoard = Board.parse(decodeURIComponent(location.search.slice(1)));
initialBoard = Board.ensure(initialBoard, 4, 4);
preact.render(<App initial={initialBoard} />, document.body);