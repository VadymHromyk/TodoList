/*
import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList from './components/TodoList';
import AddItemForm from './components/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    todoListId: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}
export type TasksType = {
    taskId: string,
    title: string,
    isDone: boolean
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {todoListId: todoListId1, title: "What to learn", filter: "all"},
        {todoListId: todoListId2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        [todoListId1]: [
            {taskId: v1(), title: 'milk', isDone: false},
            {taskId: v1(), title: 'honey', isDone: true},
            {taskId: v1(), title: 'bread', isDone: false},
            {taskId: v1(), title: 'tea', isDone: false},
            {taskId: v1(), title: 'apple', isDone: false},
            {taskId: v1(), title: 'banana', isDone: false},
        ],
    })

    const addTodoList = (title: string) => {
        let newToDoID1 = v1();
        let newToDoList: TodolistType = {todoListId: newToDoID1, title: title, filter: 'all'};
        setTodolists([newToDoList, ...todolists])

        setTasks({...tasks, [newToDoID1]: []})
    }
    function removeToDoList(todolistID: string) {
        let list = todolists.filter(t => t.todoListId !== todolistID)
        setTodolists(list)
        delete tasks.todolistID
        setTasks({...tasks})
    }
    const ChangeTitle = (title: string, idList: string) => {
        let OurList = todolists.find(l => l.todoListId === idList)
        if (OurList) {
            OurList.title = title
        }
        setTodolists([...todolists])
    }
    function changeFilter(filter: FilterValuesType, todolistID: string) {
        let ToDoList = todolists.find(tl => tl.todoListId === todolistID);
        if (ToDoList) {
            ToDoList.filter = filter
            setTodolists([...todolists])
        }
    }

    const addTask = (newTitle: string, todolistID: string) => {
        let task = {taskId: v1(), title: newTitle, isDone: false}
        let ForAddingTask = tasks[todolistID]
        tasks[todolistID] = [task, ...ForAddingTask]
        setTasks({...tasks})
    }
    function removeTask(taskID: string, todolistID: string) {
        let taskForRemoving = tasks[todolistID]
        tasks[todolistID] = (taskForRemoving.filter(t => t.taskId !== taskID))
        setTasks({...tasks})
    }
    const changeStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        let ForChangingStatus = tasks[todolistID]
        let task = ForChangingStatus.find(t => t.taskId === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }
    const ChangeTask = (title: string, idTask: string, idList: string) => {
        let OurTask = tasks[idList].find(t => t.taskId === idTask)
        if (OurTask) {
            OurTask.title = title
        }
        setTasks({...tasks})
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
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        removeToDoList={removeToDoList}
                        ChangeTask={ChangeTask}
                        ChangeTitle={ChangeTitle}
                    />)
                }
            )}
        </div>
    )
};
*/
