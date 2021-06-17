import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageThunk } from '../redux/page-reduser1'
import { AppReduser } from '../redux/redux-store'
import icon from '../icon/avatar.png';
import s from './friends.module.css'


const Page1: React.FC = () => {
    const dispatch = useDispatch()
    const userPageMap = useSelector((state: AppReduser) => state.page)
    const toggleUser = () => {
        userPageMap.friend = !userPageMap.friend
        userPageMap.friend ? userPageMap.informText = 'Friends' : userPageMap.informText = 'Not friends' 

        dispatch(PageThunk(userPageMap.friend))

    }
    useEffect(() => {
        dispatch(PageThunk(userPageMap.friend))
    }, [])
    return <div>
        <h1>{userPageMap.informText}</h1>
        <button onClick={toggleUser} >If you want you can change to the opposite</button>
        {userPageMap.userPage.map(u => {
            return <div key={u.id}>
                <div className={s.user}><img src = {u.photos.small != null ? u.photos.small : icon} className={s.iconForFriends}/>
                     {u.name}</div>
            </div>
        })}
    </div>
}
export default Page1