import React from "react";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
// import DatePicker from "react-datepicker"
import SectionHeader from "../general/SectionHeader"
import SubsectionHeader from "../general/SubsectionHeader"
import MachineSelect from "./MachineSelect";

class BasicInfo extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '20px' }}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <SectionHeader>Reserve</SectionHeader>
                            <SubsectionHeader>Why?</SubsectionHeader>
                            <textarea onChange={this.props.handleChange} value={this.props.justificaton} defaultValue={""} />
                            <SubsectionHeader>Choose a Machine</SubsectionHeader>
                            <MachineSelect isLoggedIn={this.props.isLoggedIn} selectedMachine={this.props.selectedMachine} handleMachineChange={this.props.handleMachineChange} />
                        </Col>
                        <Col md={6}>
                            <h1 className="section-header" style={{ width: '100%' }}>My Reservations</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default BasicInfo;