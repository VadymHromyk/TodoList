import { Dispatch } from 'redux';
import { todoListAPI, TodolistType } from '../../dal-api/todolist-api';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { RequestStatusType, setAppStatusAC } from '../app-reducer/app-reducer';

export type SetTodolistActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodolistType>
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    newList: TodolistType
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
type ChangeEntityStatusTodolistActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    id: string
    entityStatus: RequestStatusType
}
type ActionType = SetTodolistActionType | AddTodolistActionType
    | RemoveTodolistActionType | ChangeTitleTodolistActionType |
    ChangeFilterTodolistActionType | ChangeEntityStatusTodolistActionType;

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({
                ...tl, filter: 'all', entityStatus: 'idle'
            }))
        case 'ADD-TODOLIST':
            return [{
                ...action.newList,
                filter: 'all',
                entityStatus: 'idle',
            }, ...state];
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            const changedTodoList = state.find(l => l.id === action.id)
            if (changedTodoList) {
                changedTodoList.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER': {
            const ToDoList = state.find(tl => tl.id === action.id);
            if (ToDoList) {
                ToDoList.filter = action.filter
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            const ToDoList = state.find(tl => tl.id === action.id);
            if (ToDoList) {
                ToDoList.entityStatus = action.entityStatus
            }
            return [...state]
        }
        default:
            return state
    }
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((rej) => {
                handleServerNetworkError(dispatch, rej) 
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListAPI.postTodoList(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data) 
                }
            })
            .catch((rej) => {
                handleServerNetworkError(dispatch, rej) 
            })
    }
}
export const removeTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(id, 'loading'))
        todoListAPI.deleteTodoList(id)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(id))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTodolistEntityStatusAC(id, 'succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data) 
                }
            })
            .catch((rej) => {
                handleServerNetworkError(dispatch, rej)

            })
    }
}
export const changeTitleTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(id, 'loading'))
        todoListAPI.updateTodoList(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTitleTodolistAC(id, title))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTodolistEntityStatusAC(id, 'succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data) 
                }
            })
            .catch((rej) => {
                handleServerNetworkError(dispatch, rej)

            })
    }
}

export const setTodolistsAC = (todoLists: Array<TodolistType>): SetTodolistActionType => {
    return {type: 'SET-TODOLISTS', todoLists}
}
export const addTodolistAC = (newList: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', newList}
}
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const changeTitleTodolistAC = (id: string, title: string): ChangeTitleTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const changeFilterTodolistAC = (id: string, filter: FilterValuesType): ChangeFilterTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}
export const changeTodolistEntityStatusAC =
    (id: string, entityStatus: RequestStatusType): ChangeEntityStatusTodolistActionType => {
        return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus}
    }

