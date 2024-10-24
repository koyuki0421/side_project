import { useState } from 'react';

import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from './components/ProjectsSidebar.jsx';
import SelectedProject from './components/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    // undefined：表沒有增加也沒有選擇project，會用undefined而不是null是因為undefined會儲存新增project的ID
    // 含意：undefined：還沒有選擇專案，或還沒有進行任何專案相關操作。null：正在新增專案。具體的 projectId：已選擇了一個現有專案。
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {  // prevState：把原先的狀態改成~的意思
      return {
        ...prevState,  // 先複製狀態
        selectedProjectId: null,  // null表：正在新增專案
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {  // projectDate是想要放一個object，包含title、description、dueDate
    setProjectsState((prevState) => {
      const projectId = Math.random();   // 這邊使用Math.random()來生成id已足夠，但這不是最好的方法，因為有可能生成同樣的數字
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],  // 先複製空的array[]，再新增
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        // 刪掉project也需要更新projects array：用之前array的狀態(prevState.projects)
        // .filter是用來過濾陣列中的元素並返回一個新的陣列，保留符合條件的元素(true)。
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
          // prevState.selectedProjectId就是已經選擇要刪除的project(false)
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(  // 先找到id：.projects是array，當參數project中的id與state中的id一樣時
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (  // 把預設用成選擇的sidebarproject
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">  {/* gap-8表間距8 */}
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
