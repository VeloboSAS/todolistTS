import { ControlPoint } from "@mui/icons-material";
import {IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

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
      <TextField
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        color={"secondary"}
        id="standard-basic"
        label="Type value"
        variant="standard"
        helperText={error}
      />

      <IconButton
        color="secondary"
        onClick={AddTask}
        size="small"
        style={{ margin: "10px" }}
      >
        <ControlPoint />
      </IconButton>
    </div>
  );
}
