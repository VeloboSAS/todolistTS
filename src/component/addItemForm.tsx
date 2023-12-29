import React, { ChangeEvent, useState, KeyboardEvent } from "react";
// import s from "../todolist/todolist.module.css";
import s from './todolist/todolist.module.css'

export type AddItemFormTypes = {
    AddItem: (title: string) => void;

};

export function AddItemForm(props: AddItemFormTypes) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      props.AddItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const AddTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.AddItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={AddTask} className={s.btn}>
        Add Task
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
