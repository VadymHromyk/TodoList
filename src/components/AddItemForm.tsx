import { Button, TextField } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>('');

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }
    const onChangeAddItem = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError('')
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Title id required')
        }
        setTitle('')
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Enter a text'}
                value={title}
                onChange={onChangeAddItem}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                helperText={error}
                disabled={props.disabled}
            />
            <Button
                onClick={addItem}
                disabled={props.disabled}
                variant={'contained'}
                color={'primary'}
            >
                <AddOutlined />
            </Button>
            {/* {error && <div className={'error-message'}>{'Title id required'}</div>} */}
        </div>
    );
}
)
