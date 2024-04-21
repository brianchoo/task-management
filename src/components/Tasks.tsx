import { useState, FC, ChangeEvent } from "react";
import Button from "./Button";
import { ITask } from "../types/task.types";
import { srcGetter } from "../utils/srcGetter";

interface TaskProps {
  tasks: ITask[];
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

const Tasks: FC<TaskProps> = ({ tasks, onAdd, onDelete, onComplete }) => {
  const [enteredTask, setEnteredTask] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredTask(e.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === "") {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-stone-600 mb-8">Tasks</h2>
      <div className="flex md:items-center gap-4 flex-col md:flex-row">
        <input
          type="text"
          className="md:w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredTask}
        />
        <Button onClick={handleClick}>Add Task</Button>
      </div>
      {!tasks?.length && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks?.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <p className={`${task.complete ? "line-through" : ""}`}>
                {task.text}
              </p>
              <div>
                <button className="ml-4" onClick={() => onComplete(task.id)}>
                  <img
                    className="w-5 h-5"
                    src={srcGetter("check.png")}
                    alt="check"
                  />
                </button>
                <button className="ml-4" onClick={() => onDelete(task.id)}>
                  <img
                    className="w-5 h-5"
                    src={srcGetter("bin.png")}
                    alt="bin"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Tasks;
