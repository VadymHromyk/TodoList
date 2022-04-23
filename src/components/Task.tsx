import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { TaskStatuses, TaskType } from '../dal-api/todolist-api';
import { RequestStatusType } from '../state/app-reducer/app-reducer';
import { EditableSpan } from './EditableSpan';

export type TaskPropsType = {
    todoListId: string
    task: TaskType
    changeTaskTitle: (todoListId: string, id: string, title: string) => void
    changeTaskStatus: (todoListId: string, id: string, status: TaskStatuses) => void
    removeTask: (todoListId: string, id: string) => void
    entityStatus: RequestStatusType
}
export const Task = React.memo((props: TaskPropsType) => {

    console.log('Task called')

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListId, props.task.id, e.currentTarget.checked ? 2 : 0)
    }

    const onChangeTaskMemo = useCallback((title: string) => {
        props.changeTaskTitle(props.todoListId, props.task.id, title)
    }, [props.changeTaskTitle, props.todoListId, props.task.id])

    const onButtonClick = () => {
        props.removeTask(props.todoListId, props.task.id)
    }

    return (
        <li key={props.task.id} className={props.task.status ? 'is-done' : ''}>
            <div>
                <Checkbox
                    checked={props.task.status === 2}
                    onChange={onInputChange}
                    disabled={props.entityStatus === 'loading'}
                />
            </div>
            <div>
                <EditableSpan
                    title={props.task.title}
                    onChangeTask={onChangeTaskMemo}
                    disabled={props.entityStatus === 'loading'}
                />
            </div>
            <div>
                <IconButton
                    onClick={onButtonClick}
                    disabled={props.entityStatus === 'loading'}
                >
                    <Delete />
                </IconButton>
            </div>
        </li>
    )
});

