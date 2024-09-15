import { useState } from 'react';

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);// 表反轉Boolean值：例!true就是false；!false就是true
    // 當要更新一個值的時候，在React中應該傳遞一個函數，把該狀態改成更新的函數

    if (isEditing) {  // 當有編輯名字時，才會觸發onChangeName的函數
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {  // 抓取輸入的新名字
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = 'Edit';

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />  // onChange是當改變時，是與value的雙向綁定
    );
    // btnCaption = 'Save';
  }

  return (
    <li className={isActive ? 'active' : undefined}> {/* App()return時，會啟動css(players.highlight-player li.active)，所以要看是否啟動css，若有就給他active */}
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
