import React from "react"
import LogoutConfirmation from "./authentication/LogoutConfirmation"
import LoggingOut from "./authentication/LoggingOut"
import Submitting from "./general/Submitting"
import ValidationError from "./errors/ValidationError"
import ErrorMsg from "./general/ErrorMsg"

class ModalController extends React.Component {
    render() {
        return(<div>
            <ErrorMsg closeModal={this.props.closeModal} show={this.props.modal == "ErrorMsg"} modalText={this.props.modalText} />
            <ValidationError closeModal={this.props.closeModal} show={this.props.modal == "ValidationError"} />
            <Submitting show={this.props.modal == "Submitting"} />
            <LogoutConfirmation handleLogout={this.props.handleLogout} changeModal={this.props.changeModal} closeModal={this.props.closeModal} show={this.props.modal == "LogoutConfirmation"} />
            <LoggingOut changeModal={this.props.changeModal} closeModal={this.props.closeModal} show={this.props.modal == "LoggingOut"} />
        </div>)
    }
}

export default ModalController