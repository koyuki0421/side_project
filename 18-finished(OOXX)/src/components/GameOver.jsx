export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}  {/* It&apos;s是It's的意思 */}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
