import { AppReduser } from './redux-store';


export const getIsAuth = (state: AppReduser) => {
    return state.auth.isAuth
}
export const getLogin = (state: AppReduser) => {
    return state.auth.login
}