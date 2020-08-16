import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class ErrorMsg extends React.Component {
    render() {
        return (<div>
            <Modal onHide={this.props.closeModal} show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.modalText}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeModal} variant="primary">
                        Close
                    </Button>
                    <Button variant="secondary">
                        Get Help
                    </Button>
                </Modal.Footer>
            </Modal></div>)
    }
}

export default ErrorMsg