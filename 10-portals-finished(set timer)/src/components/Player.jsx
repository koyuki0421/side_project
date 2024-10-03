import { useState, useRef } from 'react';

export default function Player() {
  const playerName = useRef();  // always是一個js object屬性，就始終具有current屬性

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);  // .value是其中一個用法，ref有許多用法可以在mdn上看到
    playerName.current.value = '';  // 當再次按下button時，input的欄位變成空字串
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      {/* <h2>Welcome {enteredPlayerName ? enteredPlayerName ：'unknown entity'}</h2>的意思 */}
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
