import React from 'react';
import ProfileInfo from './ProfileInfo';
import MyPostsContainer from './MyPostsContainer';
import { ProfileType } from '../../type/type';

type PropsType = {
    getUsersProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    saveProfie: (profile: ProfileType) => Promise<void>
    updateStatus: (status: string) => void
    getPhoto: (file: File) => void
    profile: ProfileType | null
    status: string
    isOwner: boolean
}

const Profile:React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} 
            updateStatus={props.updateStatus} isOwner={props.isOwner} 
            getPhoto={props.getPhoto} saveProfie={props.saveProfie}/>
            <MyPostsContainer  />
        </div>

    )
}

export default Profile