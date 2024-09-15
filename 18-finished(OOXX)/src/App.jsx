import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {  // 切換玩家的function，gameTurns是一個空[]
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  // 這裡在做的是複製一個全新的array，而不是引用，因為如果是引用的話，在遊戲重新開始時無法得到原始的null array

  for (const turn of gameTurns) {  // 若turn是空的array的話，就不會執行
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
    // 更新 gameBoard 的對應位置，將玩家 ('X' 或 'O') 填入該格子中，表示這個位置已經被佔據。
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {  // gameBoard是複製全新的array；players是現在玩家
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (  // 看是否符號一樣(X或是O)，一樣就代表連線
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];  // 讓winner顯示是X還是O贏了(firstSquareSymbol)，並跳出相對應的名字(players)
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;  // 因為平手的話就是有9回合

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        // ...prevTurns複製舊有的Turns，再加上新的被點擊到的square 跟 player
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, 
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {  // 重新開始一局
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {  // 更新新名字
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
