import { useState } from 'react';

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState('');
  // 加''是因為一開始就要打字(input tasks)，所以會undefind突然變字串會有錯誤

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === '') {   // 檢查是否為空字串
      return;    // 這樣下面代表不會被執行
    }
    onAdd(enteredTask);  // 將輸入的任務送到app.jsx裡面
    setEnteredTask('');  // 清除value
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
