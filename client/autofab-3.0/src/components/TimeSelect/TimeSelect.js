import React from "react"
import moment from "moment"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import axios from "axios"

import TimeSelectBox from "./TimeSelectBox"
import SubsectionHeader from "../general/SubsectionHeader"

class TimeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayBlocks: []
        }
    }
    /* This checks to see if
     * a) A machine was picked or
     * b) If the user is now logged in
     */
    componentDidUpdate(prevProps) {
        if ((this.props.formData.machine != null && this.props.formData.date != null && this.props.formData !== prevProps.formData) || prevProps.isLoggedIn != this.props.isLoggedIn) {
            axios.get("/blocks/view", {
                params: {
                    machine: this.props.formData.machine,
                    available: true,
                    date: this.props.formData.date
                }
            }).then(res => {
                console.log("Reloading!", res)
                this.setState({
                    displayBlocks: res.data
                })
            }).catch(err => {
                if (err.response.status == 401) {
                    this.props.handle401();
                }
            })
        }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md="12">
                        <SubsectionHeader>Choose a Time Block</SubsectionHeader>
                        {this.state.displayBlocks.map(block => {
                            return (
                                <TimeSelectBox selectedBlocks={this.props.formData.blocks} handleBlocksChange={this.props.handleBlocksChange} index={block.index} key={block._id} display={{ start: moment(block.start).format("x"), end: moment(block.end).format("x") }} />
                            )
                        })}
                        
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TimeSelect;