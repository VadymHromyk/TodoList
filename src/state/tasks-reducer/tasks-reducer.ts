import { Dispatch } from 'redux';
import { TaskType, todoListAPI } from '../../dal-api/todolist-api';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { RequestStatusType, setAppStatusAC } from '../app-reducer/app-reducer';
import { AppRootStateType } from '../store';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from '../todolists-reducer/todolists-reducer';

type UpdateTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    id: string
    tasks: Array<TaskType>
}
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    taskId: string
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    id: string
    model: UpdateTaskModelType
}
type ChangeEntityStatusTaskActionType = {
    type: 'CHANGE-TASK-ENTITY-STATUS'
    id: string
    taskId: string
    entityStatus: RequestStatusType
}

type ActionsType = SetTasksActionType | SetTodolistActionType | AddTaskActionType |
    RemoveTaskActionType | UpdateTaskActionType
    | AddTodolistActionType | RemoveTodolistActionType | ChangeEntityStatusTaskActionType;

const initialState: TasksStateType = {};

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.id] = action.tasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.id];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.id] = filteredTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let tasks = state[action.id];
            let newTasks = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            state[action.id] = newTasks;
            return {...state};
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            // создаем пустой массив тасок для туду листа с id = action.id
            stateCopy[action.newList.id] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        case 'CHANGE-TASK-ENTITY-STATUS': {
            let tasks = state[action.id];
            let newTasks = tasks.map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t);
            state[action.id] = newTasks;
            return {...state};
        }
        default:
            return state
    }
}
export const fetchTasksTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListAPI.getTasks(id)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(id, tasks))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((rej) => {
                handleServerNetworkError(dispatch, rej) 
            })
    }
}
export const addTaskTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListAPI.postTask(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    dispatch(addTaskAC(task))
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
export const removeTaskTC = (id: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(id, taskId, 'loading'))
        todoListAPI.deleteTask(id, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(id, taskId))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTaskEntityStatusAC(id, taskId, 'succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data) 
                }
            })
            .catch((rej) => {
                handleServerNetworkError(dispatch, rej) 
            })
    }
}

export const updateTaskTC = (id: string, taskId: string, model: UpdateTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasks = getState().tasks;
        const currentTasks = allTasks[id]
        const task = currentTasks.find(t => {
            return t.id === taskId
        })

        if (task) {
            dispatch(setAppStatusAC('loading'))
            dispatch(changeTaskEntityStatusAC(id, taskId, 'loading'))
            todoListAPI.updateTask(id, taskId, {
                title: task.title,
                description: task.description,
                completed: task.status ? true : false,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...model
            })
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        const action = updateTaskAC(id, taskId, model)
                        dispatch(action)
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeTaskEntityStatusAC(id, taskId, 'succeeded'))
                    } else {
                        handleServerAppError(dispatch, res.data) 
                    }
                })
                .catch((rej: any) => {
                    handleServerNetworkError(dispatch, rej) 
                })
        }
    }
}

export const setTasksAC = (id: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS', id, tasks}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const removeTaskAC = (id: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, taskId}
}
export const updateTaskAC = (id: string, taskId: string, model: UpdateTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', id, taskId, model} as const
}
export const changeTaskEntityStatusAC =
    (id: string, taskId: string, entityStatus: RequestStatusType): ChangeEntityStatusTaskActionType => {
        return {type: 'CHANGE-TASK-ENTITY-STATUS', id, taskId, entityStatus}
    }


