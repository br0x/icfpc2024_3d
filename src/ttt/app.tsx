import { useState, useRef, useEffect } from 'preact/hooks'
import './app.css'

const CANVAS_MAX_SIZE = 480
const BOARD_SIZE = 3
const CELL_SIZE = CANVAS_MAX_SIZE / BOARD_SIZE
const CANVAS_SIZE = CELL_SIZE * BOARD_SIZE

type Player = 'X' | 'O'
type Board = (Player | null)[][]

export const App = () => {
  const [board, setBoard] = useState<Board>(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    drawBoard()
  }, [board])

  const drawBoard = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw grid
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    for (let i = 1; i < BOARD_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw X's and O's
    ctx.font = '48px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          const x = colIndex * CELL_SIZE + CELL_SIZE / 2
          const y = rowIndex * CELL_SIZE + CELL_SIZE / 2
          ctx.fillText(cell, x, y)
        }
      })
    })
  }

  const handleClick = (event: MouseEvent) => {
    if (winner) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const col = Math.floor(x / CELL_SIZE)
    const row = Math.floor(y / CELL_SIZE)

    if (board[row][col] === null) {
      const newBoard = board.map(row => [...row])
      newBoard[row][col] = currentPlayer
      setBoard(newBoard)

      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X'
      setCurrentPlayer(nextPlayer)

      checkWinner(newBoard)
    }
  }

  const checkWinner = (board: Board) => {
    // Check rows, columns, and diagonals
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        setWinner(board[i][0])
        return
      }
      if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        setWinner(board[0][i])
        return
      }
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      setWinner(board[0][0])
      return
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      setWinner(board[0][2])
      return
    }

    // Check for draw
    if (board.every(row => row.every(cell => cell !== null))) {
      setWinner('Draw')
    }
  }

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)))
    setCurrentPlayer('X')
    setWinner(null)
  }

  return (
    <div>
      <h2>Tic-Tac-Toe</h2>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onClick={handleClick}
      />
      <div>
        {winner ? (
          <p>{winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`}</p>
        ) : (
          <p>Current player: {currentPlayer}</p>
        )}
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  )
}

export default App