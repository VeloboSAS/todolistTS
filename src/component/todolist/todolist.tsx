import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { ChangeEvent, useState } from "react";
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

  const [alignment, setAlignment] = useState("all");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

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
      <ul>
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
            <li key={task.id} className={task.isDone ? s.isDone : ""}>
              <input
                type="checkbox"
                onChange={onChangeStatusHandler}
                checked={task.isDone}
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
            </li>
          );
        })}
      </ul>
      <div>
        <ToggleButtonGroup
          color="secondary"
          value={alignment}
          exclusive
          onChange={handleChange}
          size="small"
        >
          <ToggleButton
            onClick={onAllClickHandler}
            value="all"
          >
            All
          </ToggleButton>
          <ToggleButton
            onClick={onActiveClickHandler}
            value="active"
          >
            Active
          </ToggleButton>
          <ToggleButton
            onClick={onCompletedClickHandler}
            value="completed"
          >
            Completed
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
