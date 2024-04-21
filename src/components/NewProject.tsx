import { useRef } from "react";

import Input from "./Input.jsx";
import Modal from "./Modal.js";
import Button from "./Button.js";
import { IModalElement } from "../types/modal.types.js";
import { IProject } from "../types/project.types.js";

interface NewProjectFunctionProps {
  onAdd: (project: IProject) => void;
  onCancel: () => void;
}

const today = new Date();
const todayString = today.toISOString().split("T")[0];

const NewProject: React.FC<NewProjectFunctionProps> = ({ onAdd, onCancel }) => {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);
  const modalRef = useRef<IModalElement>(null);

  const handleSave = () => {
    const enteredTitle = title.current?.value || "";
    const enteredDescription = description.current?.value || "";
    const enteredDueDate = dueDate.current?.value || "";
    const projectId = Math.random();

    if (
      enteredTitle?.trim() === "" ||
      enteredDescription?.trim() === "" ||
      enteredDueDate?.trim() === ""
    ) {
      modalRef.current?.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
      id: projectId,
    });
  };

  const closeDeleteModal = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <div className="w-[35rem] mt-16">
        <Modal
          ref={modalRef}
          text={"Please fill up all the fields to create a new project."}
        >
          <Button type="default" onClick={closeDeleteModal}>
            Close
          </Button>
        </Modal>
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} min={todayString} label="Due Date" />
        </div>
      </div>
    </>
  );
};

export default NewProject;
