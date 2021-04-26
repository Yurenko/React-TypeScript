import { AuthApiEnum, AuthApiCaptchaEnum } from './../api/api';
import { InferActionsTypes, BaseThunkActionType } from './redux-store';
import { FormAction, stopSubmit } from 'redux-form';
import { authAPI } from '../api/authAPI';
import { securityAPI } from '../api/securityAPI';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}

const authReduser = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-LOGIN-USER':
        case 'SET-CAPTCHA-SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const actions = {
    setUserDate: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: 'SET-LOGIN-USER', payload: { userId, email, login, isAuth } }) as const,
    setCaptchaSucces: (captcha: string) => ({ type: 'SET-CAPTCHA-SUCCESS', payload: { captcha } }) as const,
}

export const getUserDate = (): ThunkActionType => async (dispatch) => {
    let data = await authAPI.me()
    if (data.resultCode === AuthApiEnum.Success) {
        let { id, email, login } = data.data;
        dispatch(actions.setUserDate(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkActionType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === AuthApiEnum.Success) {
        dispatch(getUserDate())
    } else {
        if (data.resultCode === AuthApiCaptchaEnum.Captcha) {
            dispatch(getCaptcha())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const getCaptcha = (): ThunkActionType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const url = data.url
    dispatch(actions.setCaptchaSucces(url))
}
export const logout = (): ThunkActionType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(actions.setUserDate(null, null, null, false))
    }
}

export default authReduser;

export type InitialStateType = typeof initialState
export type ActionTypes = InferActionsTypes<typeof actions>
export type ThunkActionType = BaseThunkActionType<ActionTypes | FormAction>