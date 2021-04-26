import React from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import style from './FormControl.module.css'
import { FieldValidatorType } from '../../../validators/validators'

type FormControlType = {
    meta: WrappedFieldMetaProps
}
const FormControl: React.FC<FormControlType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl{...props} > <textarea {...input} {...restProps} /></FormControl >
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl{...props} > <input {...input} {...restProps} /></FormControl >
}

export function createField<FormKeysType extends string>(placeholder: string | undefined, name: FormKeysType, validators: Array<FieldValidatorType>, component: React.FC<WrappedFieldProps>, props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>