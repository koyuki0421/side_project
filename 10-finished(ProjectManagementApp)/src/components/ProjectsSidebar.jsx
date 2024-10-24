import Button from './Button.jsx';

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      {/* md:w-72：這是一個響應式前綴，表示在 中等屏幕；rounded-r-xl：設置元素的右邊邊角為 xl（extra-large）圓角 */}
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if (project.id === selectedProjectId) {  // 如果sidebar的project被選擇到了就會換css
            cssClasses += ' bg-stone-800 text-stone-200'
          } else {
            cssClasses += ' text-stone-400'
          }

          return (
            <li key={project.id}>
              <button
                className={cssClasses}
                onClick={() => onSelectProject(project.id)}
                // 因為app.jsx中的handleSelectProject(id)有需要id這個參數，所以這邊也需要給project.id
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
