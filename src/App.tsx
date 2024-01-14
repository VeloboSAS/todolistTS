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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import { AddItemForm } from "./component/addItemForm";
import { AppRootType } from "./component/state/store";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
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

function App() {


  const dispatch = useDispatch()
  const todolists = useSelector<AppRootType, Array<TodolistType>>(state => state.todolists)

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(value, todolistId);
    dispatch(action);
  }

  let removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  };

  let changeTodolistTitle = (todolistId: string, newTitle: string) => {
    const action = changeTodolistTitleAC(todolistId, newTitle);
    dispatch(action);
  };

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
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


            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
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
