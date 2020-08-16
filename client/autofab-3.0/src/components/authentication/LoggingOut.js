import React from "react"
import {Modal, Button} from "react-bootstrap"

class LoggingOut extends React.Component {
    render() {
        return (<div>
            <Modal onHide={this.props.closeModal} show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Logging you out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please wait. If nothing happens, <a href="#">get help</a>.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">
                        Get Help
                    </Button>
                </Modal.Footer>
            </Modal></div>)
    }
}

export default LoggingOut