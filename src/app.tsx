import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { Eval } from './Eval'
import { Board, convertToArrayBoard, encode, eq, getBoardSize, parse } from './Board'
import { Cell, OP_SYMBOLS, Op } from './Cell'
import { flushSync } from 'preact/compat'
import { HoveredCanvas } from './hoveredcanvas'

export const CANVAS_MAX_SIZE = 480


interface GridProps {
    board: Board;
    edit?(x: number, y: number, cell: Cell): void;
}

export function Grid(props: GridProps) {
    const { board } = props;
    const [width, height] = getBoardSize(board);

    const tabindex = props.edit ? 0 : undefined;
    const trs = convertToArrayBoard(board).map((row, y) => {
        const tds = row.map((cell, x) => {
            const text = cell.toString();
            return <td data-x={x} data-y={y} tabindex={tabindex}>{text}</td>;
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
                    const n = board.get(`${x},${y}`)?.value;
                    if (typeof n === 'bigint') {
                        cell = -n;
                    }
                    break;
                }

                case 'Backspace': cell = Op.Empty; break;
                case 'ArrowDown':
                    if (y = height) {
                        cell = Op.Empty;
                        y += 1;
                    }
                    break;
                case 'ArrowRight':
                    if (x = width) {
                        cell = Op.Empty;
                        x += 1;
                    }
                    break;
                default:
                    if (OP_SYMBOLS.has(e.key)) {
                        cell = e.key as Op;
                    }
                    if (e.key >= '0' && e.key <= '9') {
                        cell = BigInt(e.key);
                    }
            }

            if (cell !== undefined) {
                props.edit(x, y, new Cell(cell));
            }
        }
    }

    return <table class='grid' onKeyDown={onKeyDown}><tbody>{trs}</tbody></table>;
}

export function App() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    
    const [board, setBoard] = useState<Board>(parse(decodeURIComponent('.%20.%20.%20.%20.%20.%2020%0A.%20.%20A%20.%20.%20.%20%3D%20.%20>%0A.%201%20%3D%20.%20.%20%5E%20.%20.%206%20%40%20-10%0A.%201%20S%20.%20<%201%20>%20.%20.%203%0A.%20%23%20.%20%2B%20.%20.%20.%20*%0A%5E%20.%20.%203%20>%20.%20%5E%20.%20>%0A7%20.%20-2%20%40%203%20v%201%20.%203%20%40%200%0A.%20.%20<%20.%20<%201%20*%20.%20.%203%20A%0A1%20*%20.%20.%20-20%20.%20.%20.%200%200%20%3D%0A.%20.%20.%201%20*%20.%20%2F%20.%20-%20.%20S%0A-4%20%40%203%20v%0A.%203%20.%20.%20>%20.%20.%208%20%40%20-4%20A%0A.%20.%20.%20.%20A%20*%2025%20.%203%20-1%20%3D%0A.%20>%20.%20%2F%20.%2040%20*%20.%20>%20.%20S%0A%5E%20.%20v%20S%202%20%40%20.%20*%20.%20*%0A0%20.%20.%20.%20.%203%20%5E%0A.%20-6%20%40%208%205%20>%20.%20.%209%20%40%208%0A.%20.%203%20.%20.%20.%20.%20.%20.%203')));
    const [width, height] = getBoardSize(board);

    const [result, setResult] = useState('');
    const [time, setTime] = useState(0);
    const [lt, setLt] = useState(0);
    const [boards, setBoards] = useState<Array<[Board, bigint | undefined]>>([init()]);
    const [step, setStep] = useState<[Board, bigint | undefined]>(init()); // initBoard contains A & B unchanged

    function setBoardAndURL(board: Board) {
        window.history.replaceState(null, '', '?' + encodeURIComponent(encode(board)));
        setBoard(board);
        setTime(0);
        setLt(0);
        const initialStep = init();
        setBoards([initialStep]);
        setStep(initialStep);
        setResult('');
    }

    function onEdit(x: number, y: number, cell: Cell) {
        board.set(`${x},${y}`, cell);
        setBoardAndURL(board);
    }

    useEffect(() => {
        const initialStep = init();
        setBoards([initialStep]);
        setStep(initialStep);
    }, [a, b]);
    
    function onInput(e: InputEvent, set: (n: number) => void) {
        const value = parseInt((e.target as HTMLInputElement).value, 10);
        if (isNaN(value)) return;
        set(value);
        setTime(0);
        setResult('');
    }

    function init(): [Board, bigint | undefined] {
        return [Eval.initialize(board, a, b), undefined];
    }

    function onA(e: InputEvent) {
        onInput(e, setA);
    }

    function onB(e: InputEvent) {
        onInput(e, setB);
    }

    const drawBoard = (ctx: CanvasRenderingContext2D) => {
        const [width, height, left, top] = getBoardSize(step[0]);
        const biggest = Math.max(width, height);
        const CELL_SIZE = Math.floor(CANVAS_MAX_SIZE / biggest);
        const CANVAS_SIZE = CELL_SIZE * biggest
        const top_offset = Math.floor((CANVAS_MAX_SIZE - height * CELL_SIZE) / 2);
        const left_offset = Math.floor((CANVAS_MAX_SIZE - width * CELL_SIZE) / 2);
        
        ctx.clearRect(left_offset, top_offset, CANVAS_SIZE, CANVAS_SIZE)
    
        // Draw grid
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 1
        for (let i = 0; i <= width; i++) {
            ctx.beginPath() // vertical lines
            ctx.moveTo(left_offset + i * CELL_SIZE + 0.5, top_offset)
            ctx.lineTo(left_offset + i * CELL_SIZE + 0.5, top_offset + CELL_SIZE * height)
            ctx.stroke()
        }
        for (let i = 0; i <= height; i++) {
            ctx.beginPath() // horizontal lines
            ctx.moveTo(left_offset, top_offset + i * CELL_SIZE + 0.5)
            ctx.lineTo(left_offset + CELL_SIZE * width, top_offset + i * CELL_SIZE + 0.5)
            ctx.stroke()
        }
    
        ctx.font = '16px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
    
        for (const [key, cell] of step[0]) {
            const [x, y] = key.split(',').map(Number);
            let text = cell.toString();
            // Measure text width
            const textWidth = ctx.measureText(text).width;

            // If text width exceeds cell size (minus 2 pixels for padding), replace with ellipsis
            if (textWidth > CELL_SIZE - 2) {
                text = '…'; // Unicode ellipsis character
            }
            ctx.fillText(text, left_offset + (x - left) * CELL_SIZE + CELL_SIZE / 2, top_offset + (y - top) * CELL_SIZE + CELL_SIZE / 2);
        }
    }
    
    // todo: implement localTime (that keeps counting on warps)
    function onStepForward() {
        // if within history - then just get boards[t++]
        // otherwise evaluate next
        setTime(t => {
            let next: [Board, bigint | undefined];
            if (boards.length > t+1) {
                next = boards[t+1];
                setLt(lt => lt+1);
            } else {
                try {
                    next = Eval.step(t, boards); // fixme: after warp time should decrease
                    // only increment t if evaluated without warp or error
                    if (boards.length == t+1) { // no warp
                        setBoards(prevBoards => [...prevBoards, next]);
                    } else { // warp
                        t = boards.length - 2;
                        setBoards(boards);
                    }
                    setLt(lt => lt+1);
                } catch (e: any) {
                    flushSync(() => {
                        setResult('Error: ' + e.message);
                    });
                    next = boards[t]; // stay on the same board
                    t--; // will be incremented on return
                    // should halt autorun as well
                }
            }
            setStep(next); // draw on canvas
            if (typeof next[1] === 'bigint') {
                flushSync(() => {
                    setResult('Result: ' + next[1]);
                });
            } else {
                setResult('');
            }
            return t+1;
        });
    }

    function onStepBackward() {
        if (time == 0) return;
        setLt(lt => lt-1);
        setTime(t => {
            t--;
            setStep(boards[t]); // draw on canvas
            return t;
        });
        setResult('');
    }

    // fix it according to stepForward changes
    function onRun() {
        let currentTime = time;
        let currentLt = lt;
        let currentBoards = [...boards];
        let currentStep = step;
        let finalResult = '';
    
        for (let i = 0; i < 100; i++) {
            let next: [Board, bigint | undefined];
            
            if (currentBoards.length > currentTime + 1) {
                next = currentBoards[currentTime + 1];
                currentLt++;
            } else {
                try {
                    next = Eval.step(currentTime, currentBoards);

                    // only increment currentTime if evaluated without warp or error
                    if (currentBoards.length == currentTime+1) { // no warp
                        currentBoards.push(next);
                    } else { // warp
                        currentTime = currentBoards.length - 2;
                    }
                    currentLt++;
                } catch (e: any) {
                    finalResult = 'Error: ' + e.message;
                    next = currentBoards[currentTime]; // stay on the same board
                    break;
                }
            }
    
            currentTime++;
            if (typeof next[1] === 'bigint') {
                finalResult = 'Result: ' + next[1];
                break;
            }

            if (eq(currentStep[0], next[0])) {
                finalResult = 'Error: nothing to reduce'
                break;
            }
            currentStep = next;    
        }
    
        // Update state only once at the end
        setTime(currentTime);
        setLt(currentLt);
        setBoards(currentBoards);
        setStep(currentStep);
        setResult(finalResult);
    }    

    function onSubmit(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const text = (form.elements.namedItem('text')! as HTMLTextAreaElement).value;
        const board = parse(text);
        setBoardAndURL(board);
    }

    const getCellContent = (x: number, y: number) => {
        const cell = step[0].get(`${x},${y}`);
        return cell ? cell.toString() : undefined;
    };
    
    return (
    <>
        <div class="container">
            <div class="left-block">
                <form onSubmit={onSubmit}>
                    <textarea name='text' rows={height} cols={width * 2}>{encode(board)}</textarea><br />
                    <input class="load-button" type='submit' value='load' />
                </form>
                <p>
                    <label>A: <input size={4} id='a' value={a} onInput={onA} /></label>
                    <br />
                    <br />
                    <label>B: <input size={4} id='b' value={b} onInput={onB} /></label>
                </p>
            </div>
            <div class="mid-block">
                <Grid board={board} edit={onEdit} />
            </div>
            <div class="right-block">
                <HoveredCanvas
                    width={CANVAS_MAX_SIZE}
                    height={CANVAS_MAX_SIZE}
                    draw={drawBoard}
                    getCellContent={getCellContent}
                    step={step}
                />
                <div class="button-group">
                    <button onClick={onStepBackward}>Step &lt;</button>
                    <button onClick={onStepForward}>Step &gt;</button>
                    <button onClick={onRun}>Run / Stop</button>
                </div>
                <p>Universal Time = {time}; Local Time = {lt}</p>
                <p>{result}</p>
            </div>
        </div>
    </>
    )
}
