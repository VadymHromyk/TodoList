import React, {useState} from 'react';
import css from './EditableSpan.module.css'

type PropsType = {
    title: string
    onChangeTask: (title: string) => void
}

const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState (props.title)

    const activateEditMode = () => {
        setEdit(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEdit(false)
        props.onChangeTask(title)
    }

    return edit
        ?
        <input value={title}
               onChange={(e) => {setTitle(e.currentTarget.value)}}
               onBlur={activateViewMode}
        />
        :
        <span onDoubleClick={ () => {activateEditMode()} } >{title}</span>
};

export default EditableSpan;