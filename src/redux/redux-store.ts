import {createStore, combineReducers, applyMiddleware, Action} from 'redux';
import profileReduser from './profile-reduser';
import dialogReduser from './dialog-reduser'
import usersReduser from './users-reduser';
import authReduser from './auth-reduser';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReduser from './app-reduser';
import { ThunkAction } from 'redux-thunk';
import { friendsReduser } from './friends-reduser';

let rootRedusers = combineReducers({
    postPage: profileReduser,
    dialogPage: dialogReduser,
    userPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser,
    friends: friendsReduser
});

type RootReduserType = typeof rootRedusers
export type AppReduser = ReturnType<RootReduserType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkActionType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppReduser, unknown, A>

let store = createStore(rootRedusers, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;