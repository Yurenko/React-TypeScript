import React, { FC } from 'react';
import icon from '../../icon/avatar.png';
import s from './user.module.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames'
import { UsersType } from '../../type/type';
import SearchFormick from './SearchFormik';
import { FilterType } from '../../redux/users-reduser';

type PropsType = {
    totalCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UsersType>
    followedIsFeatching: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void


}

const User: FC<PropsType> = (props) => {
    
    let pageCount = Math.ceil(props.totalCount / props.pageSize);
    let page: Array<number> = [];
    for (let i = 1; i <= pageCount; i++) {
        page.push(i)
    }

    let pagenationCount = Math.ceil(pageCount / props.portionSize);
    const [portionNumber, setPortionNumber] = useState(1)
    let leftPagenation = (portionNumber - 1) * props.portionSize + 1
    let rightPagenation = portionNumber * props.portionSize



    return <div>
        <SearchFormick onFilterChanged={props.onFilterChanged} />
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }} >PREV</button>
        }
        {
            page
                .filter(p => p >= leftPagenation && p <= rightPagenation)
                .map((p, index) => {
                    return <span className={cn({
                        [s.selectedPage]: props.currentPage === p
                    }, s.pageNumber)} onClick={(e) => { props.onPageChanged(p) }} key={index}>{p}</span>
                })
        }
        {pagenationCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }} >NEXT</button>
        }
        {
            props.users.map((u, index) => <div key={index}>
                <span>
                    <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : icon} className={s.icon} />
                    </NavLink>
                    <div>

                        {u.followed

                            ? <button disabled={props.followedIsFeatching.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)
                            }}>unfollow</button>
                            : <button disabled={props.followedIsFeatching.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id)
                            }}>follow</button>}
                    </div>
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



export default User