import { useRef } from "react";
import Tasks from "./Tasks";
import Button from "./Button";
import Modal from "./Modal";
import { IProject } from "../types/project.types";
import { ITask } from "../types/task.types";
import { IModalElement } from "../types/modal.types";

interface ISelectedProjectProps {
  project: IProject;
  onDeleteProject: (id: number) => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: number) => void;
  onCompleteTask: (id: number) => void;
  tasks: ITask[];
}

const SelectedProject: React.FC<ISelectedProjectProps> = ({
  project,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
  onCompleteTask,
  tasks,
}) => {
  const modalRef = useRef<IModalElement>(null);
  const formattedDate = new Date(project?.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const onDeleteModal = () => {
    modalRef.current?.open();
  };

  const closeDeleteModal = () => {
    modalRef.current?.close();
  };

  return (
    <div className="w-[35rem] mt-16">
      <Modal
        text={"Are you sure you want to delete this project?"}
        ref={modalRef}
      >
        <Button type="danger" onClick={() => onDeleteProject(project.id)}>
          Delete
        </Button>
        <Button type="default" onClick={closeDeleteModal}>
          Close
        </Button>
      </Modal>
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h2>
          <Button type="danger" onClick={onDeleteModal}>
            Delete
          </Button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate || ""}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks
        tasks={tasks}
        onAdd={onAddTask}
        onDelete={onDeleteTask}
        onComplete={onCompleteTask}
      />
    </div>
  );
};

export default SelectedProject;
