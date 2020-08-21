import React from "react"
import moment from "moment"

class Starting extends React.Component {
    constructor(props) {
        super(props)
        let currentTime = moment().valueOf();
        this.state = {
            interval: null,
            displayTime: this.props.reservation.start_expires - currentTime
        }
    }
    componentDidMount() {
        /**
         * Displays the countdown timer. Most of the
         * state in this app is for use with the countdown
         * timer.
         */
        let interval = setInterval(() => {
            let currentTime = moment().valueOf();
            let newTime = this.props.reservation.start_expires - currentTime
            this.setState({
                displayTime: newTime
            });
            if (newTime <= 0) {
                /**
                 * The time has expired. The reservation should be marked as never started.
                 */
                this.props.startedNoUserConf();
            }
        },1000);
        this.setState({
            interval: interval
        });
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    render() {
        return (
            /**
             * Starting is there for
             * testing purposes.
             */
            <div className="starting card green-fill">
                <div className="card-body">
                    <h4 className="card-title white-text" style={{ fontWeight: 'bold' }}>Your turn!</h4>
                    <h6 className="text-muted card-subtitle mb-2 white-text">A resevation you have scheduled is starting right now! Please mark it as started so we know you're there!</h6>
                    <div className="d-flex justify-content-center"><span className="p-2" style={{fontSize: "20px",color: "rgb(208, 0, 23)",backgroundColor: "white"}}><i className="fa fa-warning p-2"></i>Warning: You have {moment(this.state.displayTime, 'x').format("HH:mm:ss")} until your reservation is automatically cancelled!</span></div>
                    <div className="row">
        <div className="col d-flex justify-content-center" style={{ verticalAlign: 'middle' }}><span className="p-2 align-self-center text-center white-text" style={{ textDecoration: 'underline' }}>{this.props.reservation.machine.name} ({this.props.reservation.machine.type.name})</span></div>
                        <div className="col p-2 d-flex justify-content-center"><span className="p-2 align-self-center text-center white-text" style={{ textDecoration: 'underline' }}>{moment(this.props.reservation.start, 'x').format("hh:mm A")} to {moment(this.props.reservation.end, 'x').format("hh:mm A")}</span></div>
                    </div>
                    <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <div onClick={this.props.markStarted} className="p-2"><span className="text-center p-2 green-button" style={{ display: 'block', fontWeight: 'bold' }}>Start</span></div>
                        <div className="p-2"><span className="text-center p-2 white-button" style={{ display: 'block', fontWeight: 'bold' }}>Cancel</span></div>
                        <div />
                    </div>
                </div>
            </div>)
    }
}

export default Starting