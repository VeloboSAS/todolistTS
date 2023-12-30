import { Button, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { ChangeEvent } from "react";
import { FilterValuesType } from "../../App";
import { AddItemForm } from "../addItemForm";
import { EditableSpan } from "../editableSpan";
import s from "./todolist.module.css";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addItem: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolidtId: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
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
    props.removeTodolist(props.id);
  };

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addItem(title, props.id);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <Button
          onClick={removeTodolist}
          aria-label="delete"
          size="large"
          color="secondary"
          startIcon={<DeleteIcon />}
        ></Button>
      </h3>
      <AddItemForm AddItem={addTask} />
      <div>
        {props.tasks.map((task) => {
          const deleteTask = () => {
            props.removeTask(task.id, props.id);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          };
          return (
            <div key={task.id} className={task.isDone ? s.isDone : ""}>
              <Checkbox
                onChange={onChangeStatusHandler}
                checked={task.isDone}
                {...label}
                defaultChecked
                color="secondary"
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <Button
                onClick={deleteTask}
                aria-label="delete"
                size="large"
                color="secondary"
                startIcon={<DeleteIcon />}
              ></Button>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "outlined" : "text"}
          color="secondary"
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          onClick={onActiveClickHandler}
          variant={props.filter === "active" ? "outlined" : "text"}
          color="secondary"
        >
          Active
        </Button>
        <Button
          onClick={onCompletedClickHandler}
          variant={props.filter === "completed" ? "outlined" : "text"}
          color="secondary"
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
