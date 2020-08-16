import React from "react"
import {Button, Modal} from "react-bootstrap"

class LogoutConfirmation extends React.Component {
    render() {
        return (<Modal onHide={this.props.closeModal} show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation Needed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleLogout} variant="danger">
                        Yes
                    </Button>
                    <Button onClick={this.props.closeModal} variant="primary">
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Get Help
                    </Button>
                </Modal.Footer>
            </Modal>)
    }
}

export default LogoutConfirmation