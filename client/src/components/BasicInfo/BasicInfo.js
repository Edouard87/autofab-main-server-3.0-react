import React from "react";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
// import DatePicker from "react-datepicker"
import SectionHeader from "../general/SectionHeader"
import SubsectionHeader from "../general/SubsectionHeader"
import MachineSelect from "./MachineSelect";
import ReservationView from "../reservation/ReservationView"

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
                            <ReservationView handle500={this.props.handle500} handle401={this.props.handle401} changeModal={this.props.changeModal} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default BasicInfo;