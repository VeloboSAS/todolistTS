import { Button, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { ChangeEvent } from "react";
import { FilterValuesType } from "../../App";
import { AddItemForm } from "../addItemForm";
import { EditableSpan } from "../editableSpan";
import s from "./todolist.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppRootType } from "../state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../state/tasks-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolidtId: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootType, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );

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

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  let tasksForTodoList = tasks;

  if (props.filter === "completed") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
  }
  if (props.filter === "active") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
  }

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
      <AddItemForm
        AddItem={(title) => {
          const action = addTaskAC(title, props.id);
          dispatch(action);
        }}
      />
      <div>
        {tasksForTodoList.map((task) => {
          const deleteTask = () => {
            const action = removeTaskAC(task.id, props.id);
            dispatch(action);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const action = changeTaskStatusAC(
              task.id,
              e.currentTarget.checked,
              props.id
            );
            dispatch(action);
          };

          const onChangeTitleHandler = (newValue: string) => {
            const action = changeTaskTitleAC(task.id, newValue, props.id);
            dispatch(action);
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
