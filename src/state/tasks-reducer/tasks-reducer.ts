import {TasksStateType} from '../../AppWithRedux'
import {v1} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todoListId1,
    todoListId2
} from '../todolists-reducer/todolists-reducer';

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todoListId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todoListId: string
    isDone: boolean
}

type ActionsType = AddTaskActionType | RemoveTaskActionType
    | ChangeTaskTitleActionType | ChangeTaskStatusActionType
    | AddTodolistActionType | RemoveTodolistActionType;

const initialState: TasksStateType = {
    [todoListId1]: [
        {taskId: v1(), title: 'html', isDone: true},
        {taskId: v1(), title: 'css', isDone: true},
        {taskId: v1(), title: 'js', isDone: false},
        {taskId: v1(), title: 'incubator_academy', isDone: true},
        {taskId: v1(), title: 'redux', isDone: false},
        {taskId: v1(), title: 'react', isDone: false},
        {taskId: v1(), title: 'angular', isDone: false},
        {taskId: v1(), title: 'nodeJS', isDone: false},
    ],
    [todoListId2]: [
        {taskId: v1(), title: 'milk', isDone: false},
        {taskId: v1(), title: 'honey', isDone: true},
        {taskId: v1(), title: 'bread', isDone: false},
        {taskId: v1(), title: 'tea', isDone: false},
        {taskId: v1(), title: 'apple', isDone: false},
        {taskId: v1(), title: 'banana', isDone: false},
    ]
}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListId];
            const newTask = {taskId: v1(), title: action.title, isDone: false};
            const newTasks = [...tasks, newTask];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListId];
            const filteredTasks = tasks.filter(t => t.taskId !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListId];
            const task = tasks.find(t => t.taskId === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todoListId];
            let task = tasks.find(t => t.taskId === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            // создаем пустой массив тасок для туду листа с id = action.id
            stateCopy[action.todoListId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.todoListId]
            return stateCopy;
        }
        default:
            return state
    }
}

export const addTaskAC = (todoListId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todoListId, title}
}
export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoListId, taskId}
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId, title} as const
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todoListId, taskId, isDone}
}


