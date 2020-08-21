import React from "react"
import ReservationCard from "./ReservationCard"
import axios from "axios"
import {Spinner} from "react-bootstrap"

class ReservationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservation: null,
            loading: true
        }
    }
    componentDidMount() {
        // Retrieve the next reservation
        axios({
            url: "/res/view/next",
            method: "get"
        }).then(res => {
            this.setState({
                reservation: res.data,
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
            if (err.response && err.response.status == 401) {
                return this.props.handle401(); // Unauthorized
            }
            if (err.response && err.response.status == 400) return; // No reservatons
            this.props.handle500();
        })
    }
    setLoading = (val) => {
        this.setState({
            loading: val
        });
    }
    render() {
        return (<div>
            <h1>My Reservations</h1>
            {this.state.loading ? <div className="d-flex justify-content-center"><Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner></div> : this.state.reservation ? <ReservationCard setLoading={this.setLoading} changeModal={this.props.changeModal} reservation={this.state.reservation} /> : <p>You have no reservations in your name. Make a new reservation to get started! Not sure how? Check the help documentation..</p>}
        </div>
)
    }
}

export default ReservationView