import { forwardRef, useImperativeHandle, useRef } from 'react';
// forwardRef是為了將ref從一個component轉發到另一個component：讓ref={ref}有效傳遞，因為ref無法直接傳遞
import { createPortal } from 'react-dom';
// 使用createPortal：為了讓<dialog />在html正確的位置(在DOM中是我指定的位置)

// 使用forwardRef要注意：不能用export default function...，要用const 變數名稱 = forwardRef()...+最後在export default ResultModal;
// 並要注意：使用forwardRef時，要把ref的參數放在第二個，(第一個是props)
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;   // 表計時器已過期
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);  // 表剩下的時間(除以1000再取小數2位數)、toFixed是內建函數
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  // 打分數，讓分數再0~100之間，ex. remainingTime=0.36 (單位：毫秒)；targetTime=1秒，Math.round：再四捨五入，score=64

  useImperativeHandle(ref, () => {
    return {
      open() {  // open是自訂名字
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    // dialog用於創建模態對話框。對話框可以顯示一些內容，如訊息或選項，並且可以帶有互動的功能
    <dialog ref={dialog} className="result-modal" onClose={onReset}>  {/* 原本是ref={ref}，變成ref={dialog} */}  
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>  {/* <form>內建的onSubmit prop */}
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')  // createPortal的使用：因為在index.html中有<div id="modal"></div>
  );
});

export default ResultModal;
