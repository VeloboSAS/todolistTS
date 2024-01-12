import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import { v4 } from "uuid";
import "./App.css";
import { AddItemForm } from "./component/addItemForm";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./component/state/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./component/state/todolists-reducer";
import { TaskType, Todolist } from "./component/todolist/todolist";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  let todolistId1 = v4();
  let todolistId2 = v4();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v4(), title: "CSS&HTML", isDone: true },
      { id: v4(), title: "JS", isDone: true },
      { id: v4(), title: "React", isDone: true },
      { id: v4(), title: "Redux", isDone: false },
      { id: v4(), title: "Rest Api", isDone: false },
      { id: v4(), title: "GrathQL", isDone: false },
    ],
    [todolistId2]: [
      { id: v4(), title: "Phone", isDone: false },
      { id: v4(), title: "PC", isDone: true },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatchToTasksReducer(action);
  }

  function AddItem(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatchToTasksReducer(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispatchToTasksReducer(action);
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    dispatchToTasksReducer(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(value, todolistId);
    dispatchToTodolistsReducer(action);
  }

  let removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  };

  let changeTodolistTitle = (todolistId: string, newTitle: string) => {
    const action = changeTodolistTitleAC(todolistId, newTitle);
    dispatchToTodolistsReducer(action);
  };

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  return (
    <div className="App">
      <AppBar position="static" color={"secondary"}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To do List
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <AddItemForm AddItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id];

            if (tl.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === true
              );
            }
            if (tl.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === false
              );
            }

            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addItem={AddItem}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
