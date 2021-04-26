import React from 'react';
import s from './Profile.module.css'

type PropsType = {
    id: number
    name: string
    likes: number
}

const Comment: React.FC<PropsType> = (props) => {

   return (
            <div className={s.person}>
                    <div>
                        <img className={s.iconPerson} src='https://img.icons8.com/clouds/2x/user.png' />
                        <div>Likes: {props.likes}</div>
                    </div>
                    <div className={s.personName}>{props.name}</div>
                </div>
        
        
    )
}

export default Comment;