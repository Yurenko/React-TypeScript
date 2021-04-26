import { PostType, ProfileType, PhotosType } from './../type/type';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from '../api/profileApi';
import { InferActionsTypes, BaseThunkActionType } from './redux-store';

let initialState = {
    post: [
        { id: 1, name: 'Yura', likes: 15 },
        { id: 2, name: 'Vova', likes: 10 },
        { id: 3, name: 'Dima', likes: 25 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

const profileReduser = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            return {
                ...state,
                post: [...state.post, { id: 4, name: action.newPostText, likes: 0 }]
            }
        case 'SET-USERS-PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET-STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SET-PHOTO':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state;
    }
}

export const actions = {
    addPost: (newPostText: string) => ({ type: 'ADD-POST', newPostText } as const),
    setUsersProfile: (profile: ProfileType) => ({ type: 'SET-USERS-PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SET-STATUS', status } as const),
    photoSucsses: (photos: PhotosType) => ({ type: 'SET-PHOTO', photos } as const),
}

export const getStatus = (userId: number): ThunkActionType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkActionType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const getUsersProfile = (userId: number): ThunkActionType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUsersProfile(data))
}

export const getPhoto = (photos: PhotosType): ThunkActionType => async (dispatch) => {
    let data = await profileAPI.photoFile(photos)
    dispatch(actions.photoSucsses(data.data.photos))
}

export const saveProfie = (profile: ProfileType): ThunkActionType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let data = await profileAPI.profile(profile)
    if (data.resultCode === 0) {
        if (userId) {
            dispatch(getUsersProfile(userId))
        } else {
            throw new Error('Error User Profile')
        }
    } else {
        dispatch(stopSubmit('profileForm', { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}


export default profileReduser;

export type InitialStateType = typeof initialState
export type ActionTypes = InferActionsTypes<typeof actions>
export type ThunkActionType = BaseThunkActionType<ActionTypes | FormAction>


