import React from "react"

class Started extends React.Component {
    render() {
        return (<div className="card green-fill">
            <div className="card-body">
                <h4 className="card-title white-text" style={{ fontWeight: 'bold' }}>Your turn!</h4>
                <h6 className="text-muted card-subtitle mb-2 white-text">A resevation you have scheduled is starting right now! Please mark it as started so we know you're there!</h6>
                <div className="row">
                    <div className="col d-flex justify-content-center" style={{ verticalAlign: 'middle' }}><span className="p-2 align-self-center text-center white-text" style={{ textDecoration: 'underline' }}>Laser Cutter</span></div>
                    <div className="col p-2 d-flex justify-content-center"><span className="p-2 align-self-center text-center white-text" style={{ textDecoration: 'underline' }}>8:00 AM to 9:00 AM</span></div>
                </div>
                <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                    <div className="p-2"><span className="text-center red-fill p-2 green-button" style={{ display: 'block', fontWeight: 'bold' }}>Start</span></div>
                    <div className="p-2"><span className="text-center red-fill p-2 white-button" style={{ display: 'block', fontWeight: 'bold' }}>Cancel</span></div>
                    <div />
                </div>
            </div>
        </div>)
    }
}

export default Started