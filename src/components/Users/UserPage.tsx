import React from 'react'
import { NavLink } from 'react-router-dom'
import icon from '../../icon/avatar.png';
import { UsersType } from '../../type/type';
import s from './user.module.css';


type PropsType = {
    user: UsersType
    followedIsFeatching: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void

}

const UserPage: React.FC<PropsType> = ({ user, followedIsFeatching, follow, unfollow }) => {
    return (
        <div>
            <span>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : icon} className={s.icon} />
                </NavLink>
                <div>

                    {user.followed

                        ? <button disabled={followedIsFeatching.some(id => id === user.id)} className={s.button_active} onClick={() => {
                            unfollow(user.id)
                        }}>unfollow</button>
                        : <button disabled={followedIsFeatching.some(id => id === user.id)} className={s.button_passive} onClick={() => {
                            follow(user.id)
                        }}>follow</button>}
                </div>
            </span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
        </div>
    )
}

export default UserPage