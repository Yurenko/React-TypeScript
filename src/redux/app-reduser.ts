import { getUserDate } from './auth-reduser';
import { InferActionsTypes } from './redux-store';

let initialState = {
    initialized: false,
}

const appReduser = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'INITIALAZED-SUCSSES':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}
export const actions = {
    initialazedSucsses: () => ({ type: 'INITIALAZED-SUCSSES' } as const),
}



export const initialazedApp = () => (dispatch: any) => {
    let promise = dispatch(getUserDate());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initialazedSucsses())
        })
}

export default appReduser;

export type ActionsTypes = InferActionsTypes<typeof actions>
export type initialStateType = typeof initialState