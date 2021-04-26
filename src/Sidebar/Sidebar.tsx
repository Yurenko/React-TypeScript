import React from 'react';
import s from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

type PropsType ={

}

const Sidebar: React.FC = () => {
    return (
        <div className={s.Sidebar}>
            <div className={s.link}>
                <div className={`${s.item} ${s.active}`} >
                    <NavLink to='/profile'>
                        Profile
                    </NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to='/dialog'>
                        Dialog
                    </NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to='/page'>
                        Page
                    </NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to='/users'>
                        Users
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;