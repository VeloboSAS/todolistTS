import { v4 } from "uuid";
import { FilterValuesType, TodolistType } from "../../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export let todolistId1 = v4();
export let todolistId2 = v4();

const initialState: Array<TodolistType> = [

];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionsType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
        },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }

      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: title, todolistId: v4() };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};

export const changeTodolistFilterAC = (
  filter: FilterValuesType,
  id: string
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id };
};
