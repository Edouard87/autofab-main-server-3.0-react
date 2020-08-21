import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class ValidationError extends React.Component {
    render() {
        return (<div>
            <Modal onHide={this.props.closeModal} show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Validation Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>One or more of the fields were incorrectly filled out. Please review your entries and try again</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Help
                    </Button>
                    <Button onClick={this.props.closeModal} variant="primary">
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal></div>)
    }
}

export default ValidationError