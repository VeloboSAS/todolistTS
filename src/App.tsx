import React, { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import {  Todolist } from "./component/todolist/todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState([
    { id: v4(), title: "CSS&HTML", isDone: true },
    { id: v4(), title: "JS", isDone: true },
    { id: v4(), title: "React", isDone: true },
    { id: v4(), title: "Redux", isDone: false },
    { id: v4(), title: "Rest Api", isDone: false },
    { id: v4(), title: "GrathQL", isDone: false },
  ]);

  console.log(tasks);


  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v4(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodoList = tasks;

  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
