import React from 'react'
import User from './UserHook';
import Preloader from '../common/Preloader/Preloader';
import { useSelector } from 'react-redux';
import {getIsFeatching} from '../../redux/users-selectors'

const Users: React.FC = () => {
    const isFeatching = useSelector(getIsFeatching)
    return <div>
        {isFeatching ? <Preloader /> : null}
        < User />
    </div>
}

export default Users