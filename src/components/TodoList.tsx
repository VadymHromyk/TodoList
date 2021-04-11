import React from 'react';
import {TasksType, FilterValuesType} from '../App'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type TodoListPropsType = {
    id: string
    title: string
    filter: string
    tasks: Array<TasksType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todolistID: string) => void
    addTask: (newTitle: string, todolistID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeToDoList: (todolistID: string) => void
    ChangeTask: (title: string, idTask: string, idList: string) => void
    ChangeTitle: (title: string, idList: string) => void

}


function TodoList(props: TodoListPropsType) {

    const list = props.tasks.map(t =>
        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => {
                       props.changeStatus(t.id, e.currentTarget.checked, props.id)
                   }}/>
            <div>
                <EditableSpan title={t.title}
                              onChangeTask={(title) => {
                                  props.ChangeTask(title, t.id, props.id)
                              }}/>
            </div>
            <button onClick={() => {
                props.removeTask(t.id, props.id)
            }}>delete
            </button>
        </li>)

    const addItem = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div className="App">
            <div>
                <div className='title'>
                    <div className='h3'>
                        <EditableSpan title={props.title}
                                      onChangeTask={(title) => {
                                          props.ChangeTitle(title, props.id)
                                      }}/>
                    </div>
                    <button onClick={() => {
                        props.removeToDoList(props.id)
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
                            props.changeFilter('all', props.id)
                        }}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('active', props.id)
                        }}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('completed', props.id)
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
