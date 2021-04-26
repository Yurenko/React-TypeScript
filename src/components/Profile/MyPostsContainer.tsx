import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts'
import { actions } from '../../redux/profile-reduser'
import { connect } from 'react-redux';
import { AppReduser } from '../../redux/redux-store';

const mapStateToProps = (state: AppReduser) => {
    return {
        postPage: state.postPage,
    }
}

const MyPostContainer = connect<MapPropsType, DispatchPropsType, {}, AppReduser>(mapStateToProps, {addPost: actions.addPost})(MyPosts)
export default MyPostContainer
