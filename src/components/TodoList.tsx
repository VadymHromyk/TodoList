import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskStatuses, TaskType } from '../dal-api/todolist-api';
import { RequestStatusType } from '../state/app-reducer/app-reducer';
import { AppRootStateType } from '../state/store';
import { fetchTasksTC } from '../state/tasks-reducer/tasks-reducer';
import { FilterValuesType } from '../state/todolists-reducer/todolists-reducer';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Task } from './Task';

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    entityStatus: RequestStatusType
    removeToDoList: (id: string) => void
    changeTitleTodolist: (id: string, title: string) => void
    changeFilterTodolist: (id: string, newFilterValue: FilterValuesType) => void
    addTask: (id: string, newTitle: string) => void
    removeTask: (id: string, taskId: string) => void
    changeTaskTitle: (id: string, taskId: string, title: string) => void
    changeTaskStatus: (id: string, taskId: string, status: TaskStatuses) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {

    console.log('TodoList called')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    let tasksToDoList = tasks;

    if (props.filter === 'active') {
        tasksToDoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const listWithRenderedTasks = tasksToDoList.map(t =>
        <Task key={t.id}
            todoListId={props.id}
            task={t}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
            removeTask={props.removeTask}
            entityStatus={props.entityStatus}
        />
    )

    const addItem = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id]);


    const onClickHandler = useCallback((buttonName: FilterValuesType) => {
        props.changeFilterTodolist(props.id, buttonName)
    }, [props.changeFilterTodolist, props.id]);

    const onChangeTaskMemo = useCallback((title) => {
        props.changeTitleTodolist(props.id, title)
    }, [props.changeTitleTodolist, props.id])

    return (
        <div className="App">
            <div>
                <div className='title'>
                    <div className='h3'>
                        <EditableSpan title={props.title}
                            onChangeTask={onChangeTaskMemo}
                            disabled={props.entityStatus === 'loading'}
                        />
                    </div>
                    <IconButton
                        onClick={() => { props.removeToDoList(props.id) }}
                        disabled={props.entityStatus === 'loading'}
                    >
                        <Delete />
                    </IconButton>
                </div>

                <AddItemForm addItem={addItem}
                    disabled={props.entityStatus === 'loading'}
                />

                <div>
                    <Button
                        variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickHandler('all')
                        }}>All
                    </Button>
                    <Button
                        color={'primary'}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickHandler('active')
                        }}>Active
                    </Button>
                    <Button
                        color={'secondary'}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickHandler('completed')
                        }}>Completed
                    </Button>
                </div>

                <ul className='li'>
                    {listWithRenderedTasks}
                </ul>

            </div>
        </div>
    );
})

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
