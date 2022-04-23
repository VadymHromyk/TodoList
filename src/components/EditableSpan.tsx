import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

export type EditableSpanPropsType = {
    title: string
    onChangeTask: (title: string) => void
    disabled: boolean
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)

    // if disabled === true, editable mode is blocked
    const activateEditMode = () => {
        if (!props.disabled) {
            setEdit(true)
            setTitle(props.title)
        }
    }

    const activateViewMode = () => {
        setEdit(false)
        props.onChangeTask(title)
    }

    return edit
        ?
        <TextField
            variant={'outlined'}
            label={'Enter a text'}
            value={title}
            onChange={(e) => { setTitle(e.currentTarget.value) }}
            onBlur={activateViewMode}
        />
        :
        <span onDoubleClick={() => { activateEditMode() }} >{title}</span>
});

