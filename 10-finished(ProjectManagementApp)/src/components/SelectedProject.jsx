import Tasks from './Tasks.jsx';

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    // en-US表美國標準格式
    // project.dueDate：把原本選擇的日期當作參數傳給new Date
    year: 'numeric',  // 顯示所有數字
    month: 'short',   // 短的形式
    day: 'numeric',   // 選擇用數字呈現
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">  {/* whitespace-pre-wrap：保留原本的空白符號和換行符號 */}
          {project.description}
        </p>
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}
