import React from "react"
import DateSelectBox from "../DateSelect/DateSelectBox"
import moment from "moment"
import axios from "axios"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

import SubsectionHeader from "../general/SubsectionHeader"

class DateSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            days: []
        }
    }
    getData = () => {
        axios.get("/blocks/days/view").then(res => {
            this.setState({
                days: res.data
            })
        }).catch(err => {
            if (err.response.status == 401) {
                this.props.handle401();
            }
        })
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isLoggedIn != this.props.isLoggedIn) {
            this.getData();
        }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md="12">
                        <SubsectionHeader>Choose a Date</SubsectionHeader>
                        {this.state.days.map(day => {
                            return (<DateSelectBox selectedDate={this.props.selectedDate} handleDateChange={this.props.handleDateChange} key={day} day={{ date: moment(day, "MM/DD/YYYY").format("MMM Do YY"), raw: day}} />)
                        })}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DateSelect;