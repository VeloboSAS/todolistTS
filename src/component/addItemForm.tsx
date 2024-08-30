import { ControlPoint } from "@mui/icons-material";
import {IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

export type AddItemFormTypes = {
  AddItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormTypes) {
  console.log('AddItemform is called')
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
  
    if (e.key === "Enter") {
      props.AddItem(title);
      setTitle("");
    }
  };

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const AddTask = () => {
    if (title.trim() !== "") {
      props.AddItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };
  return (
    <div>
      <TextField
        value={title}
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
