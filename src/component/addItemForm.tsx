import { Button } from "@mui/material";
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
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <Button
        onClick={AddTask}
        variant="outlined"
        size="small"
        color="secondary"
        style={{ margin: "10px" }}
      >
        Add Task
      </Button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
