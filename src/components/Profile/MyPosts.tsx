import React from 'react';
import Comment from './Comment';
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLength, required } from '../../validators/validators';
import { createField, GetStringKeys, Input } from '../common/FormControl/FormControl';
import { InitialStateType } from '../../redux/profile-reduser';

export type MapPropsType = { postPage: InitialStateType }
export type DispatchPropsType = { addPost: (newPostText: string) => void }
type PostPropsType = MapPropsType & DispatchPropsType

const MyPosts: React.FC<PostPropsType> = (props) => {

    let chatApi = props.postPage.post.map((s, index) => {
        return <Comment id={s.id} key={index} name={s.name} likes={s.likes} />
    })

    let addPost = (values: PostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div>
            <MyPostsFormRedux onSubmit={addPost} />
            {chatApi}
        </div>
    )
}

let maxLength10 = maxLength(10);

type PropsType = {

}
export type PostFormValuesType = {
    newPostText: string
}
type PostValuesTypeKeys = GetStringKeys<PostFormValuesType>

let MyPostsForm: React.FC<InjectedFormProps<PostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<PostValuesTypeKeys>('New Post', 'newPostText', [required, maxLength10], Input)}
            </div>
            <button>Click Me</button>
        </form>
    )
}
let MyPostsFormRedux = reduxForm<PostFormValuesType>({ form: 'profileMyPostsForm' })(MyPostsForm)

export default MyPosts