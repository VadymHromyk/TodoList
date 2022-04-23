import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todoListsReducer} from './todolists-reducer/todolists-reducer';
import {tasksReducer} from './tasks-reducer/tasks-reducer';
import thunk from 'redux-thunk'
import { appReducer } from './app-reducer/app-reducer';
import {authReducer} from './auth-reducer/auth-reducer';


const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;