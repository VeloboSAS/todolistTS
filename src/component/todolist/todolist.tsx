import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "../../App";
import s from "./todolist.module.css";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus:(taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle("");
    }
  };

  const AddTask = () => {
    if(newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle, props.id);
    setNewTaskTitle("");
  } else {
    setError("Title is required")
  }};

  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };

  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };

  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  return (
    <div >
      <h3>{props.title} <button onClick={removeTodolist} className={s.btn}>Delete Todolist</button></h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error": ""}
        />
        <button onClick={AddTask} className={s.btn}>Add Task</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul >
        {props.tasks.map((task) => {
          const deleteTask = () => {
            props.removeTask(task.id, props.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
            
          } 
          return (
            <li key={task.id} className={task.isDone ?s.isDone: ""}>
              <input type="checkbox" 
              onChange={onChangeHandler}
              checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={deleteTask} className={s.btn}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler} className={props.filter === 'all' ? s.btnActive :s.btn}>All</button>
        <button onClick={onActiveClickHandler} className={props.filter === 'active' ? s.btnActive :s.btn}>Active</button>
        <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? s.btnActive :s.btn}>Completed</button>
      </div>
    </div>
  );
}
