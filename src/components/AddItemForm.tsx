import React, {useState, KeyboardEvent} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

function AddItemForm (props: PropsType) {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <input
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value);
                    setError(false)
                }}
                onKeyPress={onKeyPressAddTask}
                className={error ? 'error' : ''}
                onBlur={() => {
                    setError(false)
                }}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>{'Title id required'}</div>}
        </div>
    );
};

export default AddItemForm;