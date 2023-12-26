import React, { useState } from "react";

import "./App.css";
import { TaskType, Todolist } from "./component/todolist/todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let initialTasks: Array<TaskType> = [
    { id: 1, title: "CSS&HTML", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: true },
    { id: 4, title: "Redux", isDone: false },
  ];

  // let initialTasks2: Array<TaskType> = [
  //   {id: 1, title: 'Matrix' , isDone: true},
  //   {id: 2, title: 'XXX' , isDone: false},
  //   {id: 3, title: 'Terminator' , isDone: true},
  //   {id: 4, title: 'YYY' , isDone: true},
  // ]


  let [tasks, setTasks] = useState(initialTasks);
  // let [tasks2, setTasks2] = useState(initialTasks2);
  let [filter, setFilter] = useState<FilterValuesType>("all");
  // let [filter2, setFilter2] = useState<FilterValuesType>("all");

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  // function changeFilter2(value: FilterValuesType) {
  //   setFilter2(value);
  // }

  // function removeTask2(id: number) {
  //   let filteredTasks2 = tasks2.filter((t) => t.id !== id);
  //   setTasks2(filteredTasks2);
  // }


  let tasksForTodoList = tasks;

  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }

  // let tasksForTodoList2 = tasks2;
  // if (filter2 === "completed") {
  //   tasksForTodoList2 = tasks2.filter(t => t.isDone === true);
  // }
  // if (filter2 === "active") {
  //   tasksForTodoList2 = tasks2.filter(t => t.isDone === false);
  // }


  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      {/* <Todolist title='Movies'
       tasks={tasksForTodoList2}
       removeTask={removeTask2}
       changeFilter={changeFilter2}/> */}
    </div>
  );
}

export default App;
