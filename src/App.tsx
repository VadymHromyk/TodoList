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


    const addTodoList = (title: string) => {
        let newToDoID1 = v1();
        let newToDoList: TodolistType = {id: newToDoID1, title: title, filter: 'all'};
        setToDoLists([newToDoList, ...ToDoLists])

        setTasks({...tasks, [newToDoID1]: []})
    }
    function removeToDoList(todolistID: string) {
        let list = ToDoLists.filter(t => t.id !== todolistID)
        setToDoLists(list)
        delete tasks.todolistID
        setTasks({...tasks})
    }
    const ChangeTitle = (title: string, idList: string) => {
        let OurList = ToDoLists.find(l => l.id === idList)
        if (OurList) {
            OurList.title = title
        }
        setToDoLists([...ToDoLists])
    }
    function changeFilter(filter: FilterValuesType, todolistID: string) {
        let ToDoList = ToDoLists.find(tl => tl.id === todolistID);
        if (ToDoList) {
            ToDoList.filter = filter
            setToDoLists([...ToDoLists])
        }
    }

    const addTask = (newTitle: string, todolistID: string) => {
        let task = {id: v1(), title: newTitle, isDone: false}
        let ForAddingTask = tasks[todolistID]
        tasks[todolistID] = [task, ...ForAddingTask]
        setTasks({...tasks})
    }
    function removeTask(taskID: string, todolistID: string) {
        let taskForRemoving = tasks[todolistID]
        tasks[todolistID] = (taskForRemoving.filter(t => t.id !== taskID)) //в дужках ми маємо новий масив ,завдякі ф-ції фільтр, без пункту з id
        setTasks({...tasks})
    }
    const changeStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        let ForChangingStatus = tasks[todolistID]
        let task = ForChangingStatus.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }
    const ChangeTask = (title: string, idTask: string, idList: string) => {
        let OurTask = tasks[idList].find(t => t.id === idTask)
        if (OurTask) {
            OurTask.title = title
        }
        setTasks({...tasks})
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>

            {ToDoLists.map(tl => {
                    let taskForMapping = tasks[tl.id];
                    let tasksToDoList = taskForMapping;

                    if (tl.filter === 'active') {
                        tasksToDoList = taskForMapping.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksToDoList = taskForMapping.filter(t => t.isDone === true)
                    }
                    return (<TodoList
                        key={tl.id}
                        id={tl.id}
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

export default App;
/*

    const [status, setStatus] = useState<string>('All')

    function deleteLogic(id: string) {
        setWhatToBuy(whatToBuy.filter(p => {
            if (p.id !== id) {
                return [...whatToBuy]
            }
        }))
    }

    const selectProducts = (newStatusValue: string) => {
        setStatus(newStatusValue)
    }

    let newWhatToBuy = whatToBuy
    if (status === 'Active') {
        newWhatToBuy = whatToBuy.filter(p => p.isBought === false)
    } else if (status === 'Completed') {
        newWhatToBuy = whatToBuy.filter(p => p.isBought === true)
    }

    const addProduct = (product: string) => {
        let newProduct = { id: v1(), name: product, isBought: false }
        let newProducts = [newProduct, ...whatToBuy]
        setWhatToBuy(newProducts)
    }

    const setActive = (id: string, isBought: boolean) => {
        let setActive = whatToBuy.map(p => {
            if (p.id === id) {
                return { ...p, isBought: isBought }
            } else { return p }
        })
        setWhatToBuy(setActive)
    }
*/

/*let [tasks, setTasks] = useState<Array<TasksType>>([ // let array   і тд.
    { id: v1(), title: 'html', isDone: true },
    { id: v1(), title: 'css', isDone: true },
    { id: v1(), title: 'js', isDone: false },
    { id: v1(), title: 'incubator_academy', isDone: true },
    { id: v1(), title: 'redux', isDone: false },
    { id: v1(), title: 'react', isDone: false },
    { id: v1(), title: 'angular', isDone: false },
    { id: v1(), title: 'nodeJS', isDone: false }
])*/
//const tasks = array[0]   // state. то за чем надо следить (массив тасок)(массив который раньше был tasks)
//const setTasks = array[1]   // function. функцию, которая следит за этим массивом и перерисовывает список, если что то изменилось(мы назвали еe setTasks)

//const [filter, setFilter] = useState<FilterValuesType>('all')

/*const [whatToBuy, setWhatToBuy] = useState<Array<ProductsType>>(
        [
            { id: v1(), name: 'milk', isBought: false },
            { id: v1(), name: 'honey', isBought: true },
            { id: v1(), name: 'bread', isBought: false },
            { id: v1(), name: 'tea', isBought: false },
            { id: v1(), name: 'apple', isBought: false },
            { id: v1(), name: 'banana', isBought: false },
        ]
    )*/




/*
const [tasks, setTasks] = useState<TasksStateType>({
    [ToDoID1]: [
        {id: v1(), title: 'html', isDone: true},
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'js', isDone: false},
        {id: v1(), title: 'incubator_academy', isDone: true},
        {id: v1(), title: 'redux', isDone: false},
        {id: v1(), title: 'react', isDone: false},
        {id: v1(), title: 'angular', isDone: false},
        {id: v1(), title: 'nodeJS', isDone: false},
    ],
    [ToDoID2]: [
        {id: v1(), title: 'milk', isDone: false},
        {id: v1(), title: 'honey', isDone: true},
        {id: v1(), title: 'bread', isDone: false},
        {id: v1(), title: 'tea', isDone: false},
        {id: v1(), title: 'apple', isDone: false},
        {id: v1(), title: 'banana', isDone: false},
    ],
})
*/


