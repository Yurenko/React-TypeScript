import React from 'react';
import s from './Dialog.module.css'
import Masagges from './MesaggesItem';
import Dialog from './DialogItem';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { maxLength, required } from '../../validators/validators';
import { createField, GetStringKeys, Textarea } from '../common/FormControl/FormControl';
import { DialogFormValuesType } from './DialogConteiner';
import { InitialStateType } from '../../redux/dialog-reduser';

type PropsType = {
    dialogPage: InitialStateType
    sendMassage: (newMassageText: string) => void
}

type NewMassageValueType = {
    newMassageText: string
}

const Dialoges: React.FC<PropsType> = (props) => {
    let state = props.dialogPage;
    let dialog = state.dialogsUser.map((d, index) => {
        return <Dialog id={d.id} key={index} name={d.name} />
    })

    let masagges = state.masaggedata.map((p, index) => {
        return <Masagges id={p.id} key={index} masagges={p.masagges} />
    })

    let sendMassage = (values: NewMassageValueType) => {
        props.sendMassage(values.newMassageText);
        values.newMassageText = ''
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialog}
            </div>
            <div className={s.message}>
                {masagges}
                <DialogesFormRedux onSubmit={sendMassage} />
            </div>
        </div>
    )
}
let maxLength10 = maxLength(10);


type LoginFormValuesTypeKeys = GetStringKeys<DialogFormValuesType>

type OwnPropsType = {}
let DialogesForm: React.FC<InjectedFormProps<DialogFormValuesType, OwnPropsType> & OwnPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<LoginFormValuesTypeKeys>('New massage', 'newMassageText', [required, maxLength10], Textarea)}
            </div>
            <button>Click Me</button>
        </form>
    )
}

let DialogesFormRedux = reduxForm<DialogFormValuesType>({ form: 'dialogesForm' })(DialogesForm)

export default Dialoges