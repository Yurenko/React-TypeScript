import React from 'react';
import Profile from './Profile'
import { getUsersProfile, getStatus, updateStatus, getPhoto, saveProfie } from '../../redux/profile-reduser'
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import WithRedirectComponent from '../../hoc/WithRedirectComponent';
import { compose } from 'redux';
import { AppReduser } from '../../redux/redux-store';
import { ProfileType } from '../../type/type';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUsersProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    saveProfie: (profile: ProfileType) => Promise<void>
    updateStatus: (status: string) => void
    getPhoto: (file: File) => void
}
type PathParamsType = {
    userId: string
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUsersProfile(userId);
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}
            isOwner={!this.props.match.params.userId} getPhoto={this.props.getPhoto} saveProfie={this.props.saveProfie} />
    }
}
const mapStateToProps = (state: AppReduser) => ({
    profile: state.postPage.profile,
    status: state.postPage.status,
    autorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUsersProfile, getStatus, updateStatus, getPhoto, saveProfie }),
    withRouter,
    WithRedirectComponent
)(ProfileContainer)