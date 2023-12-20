import React from "react";

import "./App.css";
import { Todolist } from "./component/todolist/todolist";

function App() {
  return (
    <div className="App">
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  );
}

export default App;
