import { PageAPI } from './../api/pageApi';
import { InferActionsTypes, BaseThunkActionType } from './redux-store';
import { UsersType } from './../type/type';
const initialState = {
    userPage: [] as Array<UsersType>,
    friend: true as boolean,
    informText: 'Friends' as string
}


export const pageReduser = (state = initialState, actions: ActionsTypes): initialStateType => {
    switch (actions.type) {
        case 'SET_USER_PAGE':
            return { ...state, userPage: actions.usersPage }
        case 'FOLLOWERS':
            return {
                ...state, userPage: state.userPage.map(u => {
                    if (u.followed === actions.friend) {
                        return { ...u, friend: actions.friend }
                    }
                    return u
                })
            }
        default:
            return state
    }
}

export const actions = {
    userPage1: (usersPage: Array<UsersType>) => ({ type: 'SET_USER_PAGE', usersPage } as const),
    userFriends: (friend: null | boolean) => ({ type: 'FOLLOWERS', friend } as const)
}

export const PageThunk = (friend: null | boolean): ThunkActionType => async (dispatch) => {
    const userRes = await PageAPI.GetUser(friend)
    dispatch(actions.userPage1(userRes.items))
    dispatch(actions.userFriends(friend))
}


export type ActionsTypes = InferActionsTypes<typeof actions>
export type initialStateType = typeof initialState
export type ThunkActionType = BaseThunkActionType<ActionsTypes>