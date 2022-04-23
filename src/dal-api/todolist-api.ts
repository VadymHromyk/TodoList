import axios from 'axios';

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<string>
    data: T
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}
type InitilizeType = {
    resultCode: number
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '508e9652-12cc-49e0-9049-3c5e77957664'
    }
})

export const todoListAPI = {

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    postTodoList(title: string) {
        let promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title })
        return promise
    },
    updateTodoList(id: string, title: string) {
        let promise = instance.put<ResponseType>(`todo-lists/${id}`, { title })
        return promise
    },
    deleteTodoList(id: string) {
        let promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise
    },

    getTasks(id: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`);
    },
    postTask(id: string, title: string) {
        let promise = instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${id}/tasks`, { title })
        return promise
    },
    updateTask(id: string, taskId: string, model: UpdateTaskModelType) {
        let promise = instance.put<ResponseType>(`todo-lists/${id}/tasks/${taskId}`, model)
        return promise
    },
    deleteTask(id: string, taskId: string) {
        let promise = instance.delete<ResponseType>(`todo-lists/${id}/tasks/${taskId}`)
        return promise
    },
}

export const authAPI = {
    login(values: LoginParamsType){
        let promise = instance.post<ResponseType<{userId: string}>>(`/auth/login`, values)
        return promise
    },
    initialize() {
        let promise = instance.get<InitilizeType>(`/auth/me`)
        return promise
    },
    logout() {
        let promise = instance.delete<InitilizeType>(`/auth/login`)
        return promise
    }
}
