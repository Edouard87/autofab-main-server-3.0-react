import React from "react"
import moment from "moment"

class SystemError extends React.Component {
    render() {
        /**
         * The class name 'systemerror'
         * is there for testing reasons.
         */
        return (<div className="systemerror">
            <div className="card orange-fill">
                <div className="card-body">
                    <h4 className="card-title white-text" style={{ fontWeight: 'bold' }}><i className="fa fa-times p-2" />You're not supposed to be seeing this...</h4>
                    <h6 className="text-muted card-subtitle white-text p-2" style={{ fontSize: '20px' }}>The reservation system is currently experiencing difficulties with the reservation shown below. Please report this error so we can take a look and inform your administrator as soon as pssible to avoid any problems.</h6>
                    <div className="white-fill" />
                    <div className="row p-2">
                        <div className="col d-flex justify-content-center"><span className="p-2 align-self-center text-center text-white"><i className="fa fa-warning p-2" />{moment(this.props.reservation.start, 'x').format("dddd MMM Do yyyy")}</span></div>
                        <div className="col d-flex justify-content-center" style={{ verticalAlign: 'middle' }}><span className="p-2 align-self-center text-center text-white"><i className="fa fa-warning p-2" />Laser Cutter</span></div>
                        <div className="col p-2 d-flex justify-content-center"><span className="p-2 align-self-center text-center text-white"><i className="fa fa-warning p-2" />8:00 AM to 9:00 AM</span></div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default SystemError;