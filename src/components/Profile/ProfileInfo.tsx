import React from 'react';
import s from './Profile.module.css'
import Preloader from '../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import mainPhoto from '../../icon/avatar.png'
import lev from '../../icon/lev.jpg'
import { useState } from 'react';
import ProfileDataFormRedux from './ProfileDataForm';
import { ChangeEvent } from 'react';
import { ContactsType, ProfileType } from '../../type/type';

type PropsType = {
    saveProfie: (profile: ProfileType) => Promise<void>
    updateStatus: (status: string) => void
    getPhoto: (file: File) => void
    profile: ProfileType | null
    status: string
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }
    const onSubmit = (formData: ProfileType) => {
        props.saveProfie(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.getPhoto(e.target.files[0])
        }
    }
    
    return (

        <div>
            <div className={s.Context}>
                <img className={s.img} src={lev} />
            </div>
            <div >
                <img src={props.profile.photos.large || mainPhoto} className={s.mainPhoto} />
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                {editMode
                    ? <ProfileDataFormRedux initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                    : <ProfileData profile={props.profile} goToEditMode={() => setEditMode(true)} isOwner={props.isOwner} />}
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>

        </div>

    )
}

type ProfileDataType = {
    profile: ProfileType
    goToEditMode: () => void
    isOwner: boolean

}
const ProfileData: React.FC<ProfileDataType> = ({ profile, goToEditMode, isOwner }) => {
    return <div>{isOwner && <button onClick={goToEditMode}>edit</button>}
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob && <div>
            <b>Looking for a job description:</b> {profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                
            })}
            
        </div>
    </div>
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contacts: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={s.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo