import React from "react"
import Scheduled from "./cards/Scheduled"
import Starting from "./cards/Starting"
import Started from "./cards/Started"
import UhOh from "./cards/UhOh"
import SystemError from "./cards/SystemError"
import moment from "moment"
import axios from "axios"

class ReservationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
        }
    }
    markStarted = () => {
        this.props.setLoading(true);
        axios({
            url: "/res/mark/started",
            method: "post"
        }).then(res => {
            /**
             * The reservation has successfully been marked as started and is now
             * taking place. A new card should be shone to convey this.
             */
            this.props.setLoading(false);
            this.setState({
                status: 1
            });
        }).catch(err => {
            this.props.setLoading(false);
            this .props.changeModal("ErrorMsg","An unexpected error occured")
        })
    }
    startedNoUserConf = () => {
        this.setState({
            status: 6 // Reservation marked as stated without user confirmation
        })
    }
    render() {
        let currentTime = moment().valueOf();
        // currentTime = 1597752000000;
        // this.props.reservation.start_expires = 1597771800000;
        /**
         * Important note: If the reservation has been set to started, the idea
         * is that the client does not call the server again to get the reservation
         * if it gets a good response. Instead, it checks its state to see
         * if it is started. If the reservation that was obtained from the server
         * also has a status of 1, it will do the same –– it renders the
         * started card. Note that if the client manually changes the state
         * to 1, this will not alter the server's understanding of the
         * state of the reservation.
         */
        if (this.props.reservation.status == 1 || this.state.status == 1) {
            /**
             * The reservaton was marked as started by the user.
             */
            return <Started reservation={this.props.reservation}/>
        }
        if (this.props.reservation.start <= currentTime && this.props.reservation.start_expires >= currentTime) {
            /**
             * The reservation is started and the user should confirm this ASAP
             */
            return <Starting startedNoUserConf={this.startedNoUserConf} reservation={this.props.reservation}/>
        }
        if (this.props.reservation.status == 0 && this.props.reservation.start > currentTime && this.props.reservation.start_expires > currentTime) {
            /**
            * The reservation has been scheduled and has yet to start
            */
            return <Scheduled reservation={this.props.reservation} />
        }
        if (this.props.reservation.status == 6 || this.state.status == 6) {
            /**
             * A code 6 means that the user has not marked their reservation as
             * started. It is to inform them that it has been cancelled.
             */
            return <UhOh reservation={this.props.reservation} />
        }
        /**
         * If none of the above checks have been triggered, a warning menu should appear
         * to let the user know that their reservation has been 
         */
        return <SystemError reservation={this.props.reservation}/>
    }
}

export default ReservationCard