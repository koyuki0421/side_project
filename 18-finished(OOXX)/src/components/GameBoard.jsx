export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

// disabled表不可以重複按，為了讓他能動態處理，就要知道是否被按過，方法就是檢查playerSymbol是否存在，若存在就一定為X或是O，尚未存在就是NULL
// 表PlayerSymbol !== null會產生true，讓disabled啟動(不能重複按)，反之為false

{/* 想要有3個row、3個col
<li>
  <ol>
    <li></li>
    <li></li>
    <li></li>
  </ol>
</li>
<li></li>
<li></li> */}
