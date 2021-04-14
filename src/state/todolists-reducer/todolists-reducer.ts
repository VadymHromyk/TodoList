import {FilterValuesType, TodolistType} from '../../AppWithRedux'
import {v1} from 'uuid';

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}
type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListId: string
}
type ActionType =
    AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType;

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: Array<TodolistType> = [
    {todoListId: todoListId1, title: 'What to learn', filter: 'all'},
    {todoListId: todoListId2, title: 'What to buy', filter: 'all'},
]

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {todoListId: action.todoListId, title: action.title, filter: 'all'};
            return [...state, newTodoList]
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.todoListId !== action.todoListId)
        case 'CHANGE-TODOLIST-TITLE':
            const changedTodoList = state.find(l => l.todoListId === action.todoListId)
            if (changedTodoList) {
                changedTodoList.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const ToDoList = state.find(tl => tl.todoListId === action.todoListId);
            if (ToDoList) {
                ToDoList.filter = action.filter
            }
            return [...state]
        default:
            return state
    }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todoListId: v1(), title}
}
export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todoListId}
}
export const changeTitleTodolistAC = (todoListId: string, title: string): ChangeTitleTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId, title}
}
export const changeFilterTodolistAC = (todoListId: string, filter: FilterValuesType): ChangeFilterTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListId, filter}
}
