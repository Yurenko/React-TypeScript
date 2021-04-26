import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppReduser } from '../redux/redux-store';

const mapStateToPropsForRedirect = (state: AppReduser): MapPropsType => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {
}
function WithRedirectComponent<WCP>(WrappedComponent : React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!props.isAuth) return <Redirect to='/login' />
        return <WrappedComponent  {...restProps as unknown as WCP} />
    }
    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppReduser>
    (mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}
export default WithRedirectComponent