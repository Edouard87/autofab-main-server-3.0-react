import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class Loading extends React.Component {
    render() {
        return (<div>
            <Modal onHide={this.props.closeValidationErr} show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Processing</Modal.Title>
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

export default Loading