import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "../../App";
import s from "./todolist.module.css";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const AddTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const onAllClickHandler = () => {
    props.changeFilter("all");
  };

  const onActiveClickHandler = () => {
    props.changeFilter("active");
  };

  const onCompletedClickHandler = () => {
    props.changeFilter("completed");
  };

  return (
    <div >
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={AddTask} className={s.btn}>
          Add Task
        </button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          const deleteTask = () => {
            props.removeTask(task.id);
          };
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={deleteTask} className={s.btn}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler} className={s.btn}>
          All
        </button>
        <button onClick={onActiveClickHandler} className={s.btn}>
          Active
        </button>
        <button onClick={onCompletedClickHandler} className={s.btn}>
          Completed
        </button>
      </div>
    </div>
  );
}
