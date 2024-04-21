import { useState } from "react";

import "./App.css";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectsSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";
import { ITask } from "./types/task.types";
import { IProject } from "./types/project.types";

type SelectedProjectId = number | undefined | null;

interface IProjectState {
  selectedProjectId: SelectedProjectId;
  projects: IProject[];
  tasks: ITask[];
}

function App() {
  const [projectState, setProjectState] = useState<IProjectState>({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleSelectProject = (id: number) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleStartAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleAddProject = (projectData: IProject) => {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
      };

      return {
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
        tasks: [],
      };
    });
  };

  const handleAddTask = (text: string) => {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
        complete: false,
      };

      return {
        ...prevState,
        tasks: prevState.tasks ? [newTask, ...prevState.tasks] : [newTask],
      };
    });
  };

  const handleCompleteTask = (id: number) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.map((task) =>
          task.id === id ? { ...task, complete: true } : task
        ),
      };
    });
  };

  const handleDeleteTask = (id: number) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  };

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject!}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
      onDeleteProject={handleDeleteProject}
      onCompleteTask={handleCompleteTask}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar
        projects={projectState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
