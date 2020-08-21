import React from "react"
import moment from "moment"

class Scheduled extends React.Component {
    render() {
        return (
            /**
             * The scheduled class is for testing purposes.
             */
            <div className="scheduled">
                <div className="card red-border">
                    <div className="card-body">
                        <h4 className="card-title" style={{ fontWeight: 'bold' }}>Next Up!</h4>
                        <h6 className="text-muted card-subtitle mb-2 red-text">This is the next reservation scheduled to take place. Not sure how this works? Consult the help documentation.</h6>
                        <div className="row">
                            <div className="col d-flex justify-content-center"><span className="p-2 align-self-center text-center" style={{ textDecoration: 'underline' }}>{moment(this.props.reservation.start, "x").fromNow()}</span></div>
                            <div className="col d-flex justify-content-center" style={{ verticalAlign: 'middle' }}><span className="p-2 align-self-center text-center" style={{ textDecoration: 'underline' }}>{this.props.reservation.machine.name} ({this.props.reservation.machine.type.name})</span></div>
                            <div className="col p-2 d-flex justify-content-center"><span className="p-2 align-self-center text-center" style={{ textDecoration: 'underline' }}>{moment(this.props.reservation.start, "x").format("hh:mm A")} to {moment(this.props.reservation.end, "x").format("hh:mm A")}</span></div>
                        </div>
                        <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                            <div className="p-2"><span className="text-center red-fill p-2" style={{ display: 'block', fontWeight: 'bold' }}>Edit</span></div>
                            <div className="p-2"><span className="text-center red-fill p-2" style={{ display: 'block', fontWeight: 'bold' }}>Cancel</span></div>
                            <div />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
                    <div className="d-flex flex-column p-2" style={{ display: 'block', fontWeight: 'bold' }}>
                        <div><span>But wait, there's more!</span></div>
                        <div className="d-flex justify-content-center"><button className="btn btn-primary btn-danger" type="button">See All</button></div>
                    </div>
                </div>
            </div>)
    }
}

export default Scheduled