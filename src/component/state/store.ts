import {combineReducers, legacy_createStore as createStore} from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';

let rootReducers = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer 
});

type AppRootType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers)

//@ts-ignore
window.store = store
  
export default store
