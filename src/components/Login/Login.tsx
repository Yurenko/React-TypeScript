import { AppReduser } from './../../redux/redux-store';
import React from 'react';
import {  InjectedFormProps, reduxForm } from 'redux-form'
import { Input, createField, GetStringKeys } from '../common/FormControl/FormControl';
import { maxLength, required } from '../../validators/validators';
import { login } from '../../redux/auth-reduser'
import {  useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
    ;
import s from './Login.module.css'
type LoginFormOwnProps = {
    captcha: string | null
}


const Login: React.FC = () => {
    const captcha = useSelector((state: AppReduser) => state.auth.captcha)
    const isAuth = useSelector((state: AppReduser) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to='/profile' />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={captcha} />
    </div>
}

let maxLength25 = maxLength(25);

let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}
            {props.error && <div className={s.formError}>
                {props.error}
            </div>}
            {props.captcha && <img src={props.captcha} />}
            {props.captcha && createField<LoginFormValuesTypeKeys>("Sumbols", "captcha", [required], Input)}
            <button>Login</button>

        </form>
    )
}
export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

export default Login