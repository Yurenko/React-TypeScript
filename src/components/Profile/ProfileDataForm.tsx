import React from 'react'
import s from './Profile.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, GetStringKeys, Input, Textarea } from '../common/FormControl/FormControl'
import { ProfileType } from '../../type/type'

type PropsType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}><button >save</button>
        {props.error && <div className={s.formError}>
            {props.error}
        </div>}
        <div>
            <b>Full name:</b> {createField<ProfileFormValuesTypeKeys>("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job:</b> {createField<ProfileFormValuesTypeKeys>("Job", "lookingForAJob", [], Input, { type: 'checkbox' })}
        </div>
        <div>
            <b>My profesional skill:</b> {createField<ProfileFormValuesTypeKeys>("My profesional skill", "lookingForAJobDescription", [], Textarea)}
        </div>

        <div>
            <b>About me:</b> {createField<ProfileFormValuesTypeKeys>("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
                return <div className={s.contacts} key={key}>
                    <b>{key}</b> {createField(key, "contacts." + key, [], Input)}
                </div>
            })}
        </div>
    </form>
}

type ProfileFormValuesTypeKeys = GetStringKeys<ProfileType>

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({ form: 'profileForm' })(ProfileDataForm)

export default ProfileDataFormRedux