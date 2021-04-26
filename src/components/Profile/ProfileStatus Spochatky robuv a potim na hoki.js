import React from 'react';
import s from './Profile.module.css'

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activeMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactiveMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <div>
                {!this.state.editMode &&
                    <div >
                        <span onDoubleClick={this.activeMode} >{this.props.status || 'Введіть свій статус'}</span>
                    </div>}
                {this.state.editMode &&
                    <div >
                        <input onChange={this.onStatusChange} autoFocus onBlur={this.deactiveMode} value={this.state.status} />
                    </div>}
            </div>

        )
    }
}

export default ProfileStatus



