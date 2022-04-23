import { Dispatch } from 'redux';
import { authAPI } from '../../dal-api/todolist-api';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { setIsLoggedInAC } from '../auth-reducer/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export type StatusActionType = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}
export type ErrorActionType = {
    type: 'APP/SET-ERROR'
    error: string | null
}
type IsInitializedActionType = {
    type: 'APP/SET-INITIALIZED'
    initialized: boolean
}
type ActionsType = StatusActionType | ErrorActionType | IsInitializedActionType;


const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}


export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-INITIALIZED':
            return { ...state, isInitialized: action.initialized }
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType): StatusActionType => {
    return { type: 'APP/SET-STATUS', status }
}
export const setAppErrorAC = (error: string | null): ErrorActionType => {
    return { type: 'APP/SET-ERROR', error }
}
export const setAppInitializedAC = (initialized: boolean): IsInitializedActionType => {
    return { type: 'APP/SET-INITIALIZED', initialized }
}

export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.initialize()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((rej) => {
                handleServerNetworkError(dispatch, rej)
            })
            .finally(() => {
                dispatch(setAppInitializedAC(true))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}