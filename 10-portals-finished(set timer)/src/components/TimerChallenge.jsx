import { useState, useRef } from 'react';

import ResultModal from './ResultModal.jsx';

// let timer;
// 如果放在TimerChallenge外面的話，就會是一個共享的變數，可在所有實例(計時器)之間共用，
// 所以後面Started的計時器就會把前面Started的計時器覆蓋掉，表前面的計時器如果按下Stop也沒用

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  // 這邊使用useRef很好的點是他不會隨著useState而重渲染，表計時器能好好的照著時間跑，不會每更新一次useState就重跑一次
  // 放在TimerChallenge裡面也表示他可以是每一個實例(計時器)的ref，表ref是完全獨立工作的，不用共享

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);  // *1000是想以毫秒為單位

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;  // 表計時器起啟動

  if (timeRemaining <= 0) {   // 如果時間到了(表輸了)，就不執行這個了：timer.current
    clearInterval(timer.current); 
    dialog.current.open();  
    // 在if裡想要重新設定targetTime：setTimeRemaining(targetTime * 1000);這樣是可行的，但要小心若放在if外面會造成無限迴圈
  }

  // 會設置此function是因為上面如果用setTimeRemaining(targetTime * 1000)，表在ResultModal.jsx中計算剩餘時間的同時targetTime也會被重置，這樣算不出剩餘時間
  function handleReset() {   // 為了重置targetTime
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {    // setInterval是js內建函數
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
    // 表每10毫秒，執行一次這個funciton： setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10)以更新時間
  }

  function handleStop() {  // 這function是手動停止計時器，表贏了
    dialog.current.open();
    clearInterval(timer.current);  //  clearInterval是js內建函數
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
