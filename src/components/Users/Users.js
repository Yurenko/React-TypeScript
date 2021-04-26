import React from 'react';
import s from './user.module.css';
import * as axios from 'axios'

let Users = (props) => {

    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    props.setUsers(response.data.items)
                })
        }
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {

            props.users.map(u => <div key={u.id}>
                <span>
                    <img src={u.imageUrl} className={s.icon} />
                    <div>{u.followers
                        ? <button onClick={() => { props.unfollow(u.id) }}>unfollow</button>
                        : <button onClick={() => { props.follow(u.id) }}>follow</button>}</div>
                </span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{'u.location.city'}</div>
                    <div>{'u.location.country'}</div>
                </span>
            </div>)
        }
    </div>
}

export default Users