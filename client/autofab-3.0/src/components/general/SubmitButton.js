import React from "react"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

class SubmitButton extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col><button className="btn btn-danger submit-button" type="button" onClick={this.props.handleSubmit} style={{marginTop: "10px", marginLeft: 0}}>Reserve</button></Col>
                </Row>
            </Container>
        )
    }
}
export default SubmitButton