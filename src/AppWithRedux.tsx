import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddItemForm from './components/AddItemForm';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC
} from './state/todolists-reducer/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

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

   const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    function removeToDoList(todoListId: string) {
        dispatch(removeTodolistAC(todoListId))
    }
    const changeTitleTodolist = (todoListId: string, title: string) => {
        dispatch(changeTitleTodolistAC(todoListId, title))
    }
    function changeFilterTodolist(todoListId: string, filter: FilterValuesType) {
        dispatch(changeFilterTodolistAC(todoListId, filter))
    }

    const addTask = (todoListId: string, newTitle: string) => {
        dispatch(addTaskAC(todoListId, newTitle))
    }
    function removeTask(todoListId: string, taskId: string) {
        dispatch(removeTaskAC(todoListId, taskId))
    }
    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, title))
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
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






