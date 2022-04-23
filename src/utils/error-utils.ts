import {ErrorActionType, setAppErrorAC, setAppStatusAC, StatusActionType} from '../state/app-reducer/app-reducer';
import {Dispatch} from 'redux';
import { ResponseType } from '../dal-api/todolist-api';

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
};

export const handleServerNetworkError = (dispatch: Dispatch, error: any) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
};

type ErrorUtilsDispatchType = Dispatch<StatusActionType | ErrorActionType>