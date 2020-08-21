import React from "react";
import {Button} from "react-bootstrap"
import {Redirect} from "react-router-dom"

class Confirmation extends React.Component {
    render() {
        return (<section style={{ padding: '10px' }}><span style={{ borderBottom: '1px solid black', fontWeight: 'bold', fontSize: '30px' }}>Create a new Reservation</span>
            <div style={{ marginTop: '10px' }}>
                <div className="alert alert-success" role="alert"><span style={{ fontSize: '21px' }}><strong>Thank you! Your Reservation has been confirmed.</strong></span>
                    
                    <div>
                        <p>You may now safely return to the home page. Your reservation will be visible to you if ever you need to review it or make changes to it.</p>
                        <Button variant="success" onClick={() => {this.props.route("/")}}>Return to Home Page</Button>
                        <Redirect to={this.props.redirect} />
                    </div>
                </div>
                {/* Below is Reserved for Future Use*/}
                {/* <div className="row">
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col"><span style={{ fontWeight: 'bold' }}>Machine Name</span><span /></div>
                        </div>
                        <div className="row">
                            <div className="col"><span>Machine type</span>
                                <div className="row">
                                    <div className="col"><span>Date</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col"><span>Time Block Interval</span></div>
                        </div>
                    </div>
                    <div className="col-md-4"><span><strong>Extra Notes: </strong>Your administrator has not specified anything.</span></div>
                    <div className="col-md-4">
                        <p>Lower Canada College<br />4090 Avenue Royal<br />Montreal, Quebec<br />H4A 2M5<br />Should you have any questions or concerns, please&nbsp;<span style={{ textDecoration: 'underline' }}>contact us.</span></p>
                    </div>
                </div> */}
            </div>
        </section>)
    }
}

export default Confirmation