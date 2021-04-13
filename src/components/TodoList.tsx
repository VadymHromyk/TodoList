import React from 'react';
import {TasksType, FilterValuesType} from '../AppWithRedux'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
    addTask: (newTitle: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeToDoList: (todoListId: string) => void
    ChangeTask: (title: string, taskId: string, todoListId: string) => void
    ChangeTitle: (title: string, todoListId: string) => void

}
// add .trim() func

function TodoList(props: TodoListPropsType) {

    const list = props.tasks.map(t =>
        <li key={t.taskId} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => {
                       props.changeStatus(t.taskId, e.currentTarget.checked, props.todoListId)
                   }}/>
            <div>
                <EditableSpan title={t.title}
                              onChangeTask={(title) => {
                                  props.ChangeTask(title, t.taskId, props.todoListId)
                              }}/>
            </div>
            <button onClick={() => {
                props.removeTask(t.taskId, props.todoListId)
            }}>delete
            </button>
        </li>)

    const addItem = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    return (
        <div className="App">
            <div>
                <div className='title'>
                    <div className='h3'>
                        <EditableSpan title={props.title}
                                      onChangeTask={(title) => {
                                          props.ChangeTitle(title, props.todoListId)
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
                            props.changeFilter('all', props.todoListId)
                        }}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('active', props.todoListId)
                        }}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('completed', props.todoListId)
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
