import { v4 } from "uuid";
import { FilterValuesType, TasksStateType, TodolistType } from "../../App";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string,
  taskId: string
} 

export type AddTaskActionType = {
  type: 'ADD-TASK',
  title: string,
  todolistId: string
} 
 

type ActionsType = RemoveTaskActionType | AddTaskActionType 

export const tasksReducer = (
  state: Array<TasksStateType>,
  action: ActionsType
): Array<TasksStateType> => {
  switch (action.type) {
    case 'REMOVE-TASK':{
      const stateCopy = {...state}
      const tasks = state[action.todolistId]
      const filteredTasks = tasks.filter((t: { id: string; }) => t.id !== action.taskId)
      stateCopy[action.todolistId] = filteredTasks
      return stateCopy
    }

    case 'ADD-TASK':{
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId]
      let newTask = { id: v4(), title: action.title, isDone: false }; 
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todolistId] = newTasks
      return stateCopy  
    }
 

    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todolistId}
}
