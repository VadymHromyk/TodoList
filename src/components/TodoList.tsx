import React from 'react';
import {TasksType, FilterValuesType} from '../AppWithRedux'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: string
    tasks: Array<TasksType>
    removeToDoList: (todoListId: string) => void
    changeTitleTodolist: (todoListId: string, title: string) => void
    changeFilterTodolist: (todoListId: string, newFilterValue: FilterValuesType) => void
    addTask: (todoListId: string, newTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
}

function TodoList(props: TodoListPropsType) {

    const list = props.tasks.map(t =>
        <li key={t.taskId} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => {
                       props.changeTaskStatus(props.todoListId, t.taskId, e.currentTarget.checked)
                   }}/>
            <div>
                <EditableSpan title={t.title}
                              onChangeTask={(title) => {
                                  props.changeTaskTitle(title, t.taskId, props.todoListId)
                              }}/>
            </div>
            <button onClick={() => {
                props.removeTask(props.todoListId, t.taskId)
            }}>delete
            </button>
        </li>)

    const addItem = (title: string) => {
        props.addTask(props.todoListId, title)
    }

    return (
        <div className="App">
            <div>
                <div className='title'>
                    <div className='h3'>
                        <EditableSpan title={props.title}
                                      onChangeTask={(title) => {
                                          props.changeTitleTodolist(title, props.todoListId)
                                      }}/>
                    </div>
                    <button onClick={() => {
                        props.removeToDoList(props.todoListId)
                    }}>X
                    </button>
                </div>

                <AddItemForm addItem={addItem}/>

                <ul className='li'>
                    {list}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilterTodolist(props.todoListId, 'all')
                        }}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilterTodolist(props.todoListId, 'active')
                        }}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilterTodolist(props.todoListId, 'completed')
                        }}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;


/*const [newTitle, setTitle] = useState<string>('');

const [error, setError] = useState<boolean>(false);

const addTask = () => {
    const trimmedTitle = newTitle.trim()
    if (trimmedTitle) {
        props.addTask(trimmedTitle, props.id)
    } else {
        setError(true)
    }
    setTitle('')
}*/


/*<div>
                    <input
                        value={newTitle}
                        onChange={(e) => {
                            setTitle(e.currentTarget.value);
                            setError(false)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') addTask()
                        }}
                        className={error ? 'error' : ''}
                        onBlur={() => {
                            setError(false)
                        }}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className={'error-message'}>{'Title id required'}</div>}
               </div>*/
