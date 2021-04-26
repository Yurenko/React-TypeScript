import React from 'react'
import { NavLink } from 'react-router-dom';
import s from './Dialog.module.css'

type PropsType = {
    id: number
    name: string
}

const Dialog: React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialog/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default Dialog