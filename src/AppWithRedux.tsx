import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList from './components/TodoList';
import AddItemForm from './components/AddItemForm';
import {
    todoListsReducer,
    addTodolistAC,
    removeTodolistAC,
    changeTitleTodolistAC,
    changeFilterTodolistAC
} from './state/todolists-reducer/todolists-reducer';
import {addTaskAC, tasksReducer, removeTaskAC, changeTaskTitleAC, changeTaskStatusAC} from './state/tasks-reducer/tasks-reducer';

export type TodolistType = {
    todoListId: string,
    title: string,
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TasksStateType = {
    [key: string]: Array<TasksType>
}
export type TasksType = {
    taskId: string,
    title: string,
    isDone: boolean
}

function AppWithRedux() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, dispatchToTodolist] = useReducer(todoListsReducer, [
        {todoListId: todoListId1, title: "What to learn", filter: "all"},
        {todoListId: todoListId2, title: "What to buy", filter: "all"}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        ],
    })

    const addTodoList = (title: string) => {
        dispatchToTodolist(addTodolistAC(title))
        dispatchToTasks(addTodolistAC(title))
    }
    function removeToDoList(todoListId: string) {
        dispatchToTodolist(removeTodolistAC(todoListId))
        dispatchToTasks(removeTodolistAC(todoListId))
    }
    const changeTitleTodolist = (todoListId: string, title: string) => {
        dispatchToTodolist(changeTitleTodolistAC(todoListId, title))
    }
    function changeFilterTodolist(todoListId: string, filter: FilterValuesType) {
        dispatchToTodolist(changeFilterTodolistAC(todoListId, filter))
    }

    const addTask = (todoListId: string, newTitle: string) => {
        dispatchToTasks(addTaskAC(todoListId, newTitle))
    }
    function removeTask(todoListId: string, taskId: string) {
        dispatchToTasks(removeTaskAC(todoListId, taskId))
    }
    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todoListId, taskId, title))
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todoListId, taskId, isDone))
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>

            {todolists.map(tl => {
                    let taskForMapping = tasks[tl.todoListId];
                    let tasksToDoList = taskForMapping;

                    if (tl.filter === 'active') {
                        tasksToDoList = taskForMapping.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksToDoList = taskForMapping.filter(t => t.isDone === true)
                    }
                    return (<TodoList
                        key={tl.todoListId}
                        todoListId={tl.todoListId}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksToDoList}
                        removeToDoList={removeToDoList}
                        changeTitleTodolist={changeTitleTodolist}
                        changeFilterTodolist={changeFilterTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                    />)
                }
            )}
        </div>
    )
};

export default AppWithRedux;






