/*eslint-disable*/
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Board from './Board';
import GameInfo from './GameInfo'

const Game = styled.div`
  margin: 0 auto;
  width: 570px;
  padding: 10px 0;
`;

function App() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [blackIsNext, setBlackIsNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const boardSize = 19
  const currentPlayerColor = blackIsNext ? 'black' : 'white'
  // count 用來判斷是否和局
  const count = useRef(0)

  const handleSetNewGame = () => {
    setBoard(Array(19).fill(Array(19).fill(null)))
    setBlackIsNext(true)
    setWinner(null)
  }

  function checkFiveInARow(clickedX, clickedY, directionX, directionY) {
    let currentX = clickedX
    let currentY = clickedY
    let buildARowLength = 0
    
    do {
      currentX += directionX
      currentY += directionY

      if(
        currentX >= 0 &&
        currentY >= 0 &&
        currentX < boardSize &&
        currentY < boardSize &&
        board[currentY][currentX] === (blackIsNext ? 'black' : 'white')
      ) {
        buildARowLength += 1
      } else {
        break
      }
    } while (true)
    return buildARowLength
  }

  function calculateWinner(x, y, currentPlayerColor) {
    if(
      checkFiveInARow(x, y, 1, 0) + checkFiveInARow(x, y, -1, 0) >=4 ||
      checkFiveInARow(x, y, 0, 1) + checkFiveInARow(x, y, 0, -1) >= 4 ||
      checkFiveInARow(x, y, 1, 1) + checkFiveInARow(x, y, -1, -1) >= 4 ||
      checkFiveInARow(x, y, 1, -1) + checkFiveInARow(x, y, -1, 1) >= 4
    ) {
      return currentPlayerColor
    }
    return null
  }

  const handlePlaceStone = (x, y, currentPlayerColor) => {
    if(winner || board[y][x] || count.current >= 361) return
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[y][x] = currentPlayerColor
    setBoard(newBoard)
    if(calculateWinner(x, y, currentPlayerColor)) {
      setWinner(currentPlayerColor)
      return
    }
    setBlackIsNext(!blackIsNext)
    count.current += 1
  }

  return (
    <Game>
      <GameInfo 
        winner={winner}
        handleSetNewGame={handleSetNewGame}
        currentPlayerColor={currentPlayerColor} 
        count={count}
      />
      <Board 
        board={board}
        handlePlaceStone={handlePlaceStone}
        currentPlayerColor={currentPlayerColor} 
      />
    </Game>
  );
}

export default App;
