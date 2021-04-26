import { InferActionsTypes, BaseThunkActionType } from './redux-store';
import { UsersType } from './../type/type';
import { usersAPI } from '../api/usersApi';

let initialState = {
    users: [] as Array<UsersType>,
    totalCount: 0,
    pageSize: 25,
    currentPage: 1,
    isFeatching: true,
    followedIsFeatching: [] as Array<number>, // type number userId
    portionSize: 10,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReduser = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                }),
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                }),
            }
        case 'SET-USERS': {
            return { ...state, users: action.users }
        }
        case 'SET-CURRENT-PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SET-TOTAL-COUNT': {
            return { ...state, totalCount: action.count }
        }
        case 'TOGGLE-IS-FEATCHING': {
            return { ...state, isFeatching: action.isFeatching }
        }
        case 'TOGGLE-FOLLOWED-IS-FEATCHING': {
            return {
                ...state,
                followedIsFeatching: action.isFeatching
                    ? [...state.followedIsFeatching, action.userId]
                    : state.followedIsFeatching.filter(id => id != action.userId)
            }
        }
        case 'SEARCH-USERS': {
            return {
                ...state, filter: action.payload
            }
        }
        default:
            return state;
    }
}

export const actions = {
    acceptFollow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    acceptUnfollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET-USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET-CURRENT-PAGE', currentPage } as const),
    setTotalCount: (totalCount: number) => ({ type: 'SET-TOTAL-COUNT', count: totalCount } as const),
    toggleIsFeatching: (isFeatching: boolean) => ({ type: 'TOGGLE-IS-FEATCHING', isFeatching } as const),
    toggleFollowedIsFeatching: (isFeatching: boolean, userId: number) => ({ type: 'TOGGLE-FOLLOWED-IS-FEATCHING', isFeatching, userId } as const),
    searchUsers: (filter: FilterType) => ({ type: 'SEARCH-USERS', payload: filter } as const),

}

export const getUsersThunk = (currentPage: number, pageSize: number, filter: FilterType): ThunkActionType =>
    async (dispatch) => {
        debugger
        dispatch(actions.toggleIsFeatching(true));
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.searchUsers(filter))
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFeatching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))
    }

export const unfollow = (userId: number): ThunkActionType => async (dispatch) => {
    dispatch(actions.toggleFollowedIsFeatching(true, userId));
    let data = await usersAPI.unfollow(userId)
    if (data.resultCode === 0) {
        dispatch(actions.acceptUnfollow(userId))
    }
    dispatch(actions.toggleFollowedIsFeatching(false, userId));
}

export const follow = (userId: number): ThunkActionType => async (dispatch) => {
    dispatch(actions.toggleFollowedIsFeatching(true, userId));
    let data = await usersAPI.follow(userId)
    if (data.resultCode === 0) {
        dispatch(actions.acceptFollow(userId))
    }
    dispatch(actions.toggleFollowedIsFeatching(false, userId));
}


export default usersReduser;
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export type ActionTypes = InferActionsTypes<typeof actions>
export type ThunkActionType = BaseThunkActionType<ActionTypes>