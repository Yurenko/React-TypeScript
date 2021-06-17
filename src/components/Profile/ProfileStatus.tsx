import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './Profile.module.css'

type PropsType = {
status: string
updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => { setStatus(props.status) }
        , [props.status])

    const activeMode = () => {
        setEditMode(true)
    }

    const deactiveMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)

    }

    return (
        <div className={s.status}>
            {!editMode &&
                <div >
                    <span onDoubleClick={activeMode} >{status || 'Введіть свій статус'}</span>
                </div>}
            {editMode &&
                <div >
                    <input onChange={onStatusChange} onBlur={deactiveMode} autoFocus={true} value={status} />
                </div>}
        </div>

    )
}

export default ProfileStatus