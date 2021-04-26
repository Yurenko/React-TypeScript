import { InferActionsTypes } from './redux-store';
type MassageType = {
    id: number
    masagges: string
}
type DialogType = {
    id: number
    name: string
}

let initialState = {
    masaggedata: [
        { id: 1, masagges: 'Hi' },
        { id: 2, masagges: 'My name is Yura' },
        { id: 3, masagges: 'Hi' },
    ] as Array<MassageType>,
    dialogsUser: [
        { id: 1, name: 'Yura' },
        { id: 2, name: 'Vova' },
        { id: 3, name: 'Dima' }
    ] as Array<DialogType>,
    newMassageText: ''
}

const dialogReduser = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case 'SEND-MASSEGE': {
            return {
                ...state,
                newMassageText: '',
                masaggedata: [...state.masaggedata, { id: 4, masagges: action.newMassageText }]
            }
        }
        default:
            return state;
    }
}

export const actions = {
    sendMassage: (newMassageText: string) => ({ type: 'SEND-MASSEGE', newMassageText } as const)
}

export default dialogReduser;

export type InitialStateType = typeof initialState
export type ActionTypes = InferActionsTypes<typeof actions>
