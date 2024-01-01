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
import { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import { AddItemForm } from "./component/addItemForm";
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

function App() {
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function AddItem(title: string, todolistId: string) {
    let newTask = { id: v4(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    //достаём нужный массив по todolistId
    let tasks = tasksObj[todolistId];
    //найдем нужную таску
    let task = tasks.find((t) => t.id === taskId);
    //изменим таску, если она нашлась
    if (task) {
      task.isDone = isDone;
    }
    //засетаем в стейт копию обьекта, чтобы React отреагировал отрисовкой
    setTasks({ ...tasksObj });
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
    }
    //засетаем в стейт копию обьекта, чтобы React отреагировал отрисовкой
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }
  let todolistId1 = v4();
  let todolistId2 = v4();

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolist(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  let changeTodolistTitle = (todolistId: string, newTitle: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolist([...todolists]);
    }
  };

  let [tasksObj, setTasks] = useState<TasksStateType>({
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

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v4(),
      filter: "all",
      title: title,
    };
    setTodolist([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: [],
    });
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
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To do List
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '10px'}}>
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
                <Paper elevation={3} style={{padding: '10px'}}>
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

export default App;
