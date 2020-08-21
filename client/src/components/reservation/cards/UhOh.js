import React from "react"

class UhOh extends React.Component {
    render() {
        return (<div className="card red-fill">
            <div className="card-body">
                <h4 className="card-title" style={{ fontWeight: 'bold' }}><i className="fa fa-exclamation-circle p-2" />Uh-Oh!</h4>
                <h6 className="text-muted card-subtitle white-text p-2" style={{ fontSize: '20px' }}>You did not mark your reservation as started. As a result, it was cancelled, and your spot may or may not have been given to another student.</h6>
    <div className="white-fill"><span className="red-text"><i className="fa fa-minus p-2" />You have been given <strong>{this.props.reservation.blocks.length}</strong> {this.props.reservation.blocks.length == 1 ? "strike" : "strikes"} for this incident</span></div>
                <div className="row p-2">
                    <div className="col d-flex justify-content-center"><span className="p-2 align-self-center text-center" style={{ textDecoration: 'line-through' }}>March 7th 2020</span></div>
                    <div className="col d-flex justify-content-center" style={{ verticalAlign: 'middle' }}><span className="p-2 align-self-center text-center" style={{ textDecoration: 'line-through' }}>Laser Cutter</span></div>
                    <div className="col p-2 d-flex justify-content-center"><span className="p-2 align-self-center text-center" style={{ textDecoration: 'line-through' }}>8:00 AM to 9:00 AM</span></div>
                </div>
                <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                    <div />
                </div><span>If you believe this was a mistake, please contact your administrator as soon as possible. Please note that too many strikes may result in account suspension.</span></div>
        </div>)
    }
}

export default UhOh