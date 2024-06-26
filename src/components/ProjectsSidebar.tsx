import Button from "./Button.jsx";
import { IProject } from "../types/project.types";

type SelectedProjectId = number | undefined | null;

interface ProjectSideBarProps {
  onStartAddProject: () => void;
  projects: IProject[];
  onSelectProject: (id: number) => void;
  selectedProjectId: SelectedProjectId;
}

const ProjectsSidebar: React.FC<ProjectSideBarProps> = ({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) => {
  return (
    <div className="w-1/3 px-3 md:px-8 py-16 bg-stone-900 text-stone-50 md:w-72 min-h-screen">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button type="default" onClick={onStartAddProject}>
          + Add Project
        </Button>
      </div>
      <ul className="mt-8">
        {projects &&
          projects.map((project) => {
            let cssClasses =
              "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

            if (project.id === selectedProjectId) {
              cssClasses += " bg-stone-800 text-stone-200";
            } else {
              cssClasses += " text-stone-400";
            }

            return (
              <li key={project.id}>
                <button
                  className={cssClasses}
                  onClick={() => onSelectProject(project.id)}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ProjectsSidebar;
