import {combineReducers, createStore} from 'redux';
import {todoListsReducer} from './todolists-reducer/todolists-reducer';
import {tasksReducer} from './tasks-reducer/tasks-reducer';


const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;