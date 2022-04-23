import { Dispatch } from 'redux';
import { authAPI, LoginParamsType } from '../../dal-api/todolist-api';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { setAppStatusAC } from '../app-reducer/app-reducer';

const initialState = {
    isLoggedIn: false
}
export type InitialAuthStateType = typeof initialState

export const authReducer = (state: InitialAuthStateType = initialState, action: ActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const loginTC = ( values: LoginParamsType ) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(values)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                    console.log('logged in')
                } else {
                    handleServerAppError(dispatch, res.data) 
                }
            })
            .catch((rej) => {
                handleServerNetworkError(dispatch, rej) 
            })
    }
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((rej) => {
            handleServerNetworkError(dispatch, rej)
        })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

