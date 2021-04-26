import { AppReduser } from './../../redux/redux-store';
import Dialog from './Dialog';
import { actions } from '../../redux/dialog-reduser';
import { connect } from 'react-redux';
import WithRedirectComponent from '../../hoc/WithRedirectComponent';
import { compose } from 'redux';

export type DialogFormValuesType = {
    newMassageText: string
}

const mapStateToProps = (state: AppReduser) => {
    return {
    dialogPage: state.dialogPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMassage: actions.sendMassage}),
    WithRedirectComponent
)(Dialog)