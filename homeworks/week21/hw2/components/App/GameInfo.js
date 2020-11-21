/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

const GameInfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  background: rgba(158, 200, 224, 0.7);
`;

const SetNewGameButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  background: rgb(212, 160, 164);
  padding: 5px 10px;
  cursor: pointer;
`;

const NextPlayer = styled.div`
  font-size: 30px;
  color: rgba(0, 0, 0, 0.7);
`;

function PlayerStatus({winner, currentPlayerColor, count}) {
  let status = ''
  if(winner) {
    status = `Winner is : ${winner}`
  } else if(count.current >= 361) {
    status = `Fair Game !`
  } else {
    status = `Next is : ${currentPlayerColor}`
  }
  return (
    <NextPlayer>{status}</NextPlayer>
  )
}

export default function GameInfo({winner, handleSetNewGame, currentPlayerColor, count}) {
  return (
    <GameInfoBlock>
      <PlayerStatus winner={winner} currentPlayerColor={currentPlayerColor} count={count} />
      <SetNewGameButton onClick={handleSetNewGame}>New Game</SetNewGameButton>
    </GameInfoBlock>
  )
}